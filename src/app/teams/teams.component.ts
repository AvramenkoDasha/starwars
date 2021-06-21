import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {TeamCardComponent} from "./team-card/team-card.component";
import {PlanetService} from "../services/planet.service";
import {PeopleService} from "../services/people.service";
import {StarshipService} from "../services/starship.service";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamsComponent implements OnInit {

  columns = [{
    name: 'name',
    label: 'НАЗВАНИЕ'
  }, {
    name: 'starship',
    label: 'ЗВЕЗДОЛЕТ'
  }, {
    name: 'planet',
    label: 'ПЛАНЕТА БАЗИРОВАНИЯ'
  }, {
    name: 'crew',
    label: 'ЭКИПАЖ'
  }];
  dataSource;
  planets;
  people;
  starships;
  selectedTeamId = -1;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog,
              private planetService: PlanetService,
              private peopleService: PeopleService,
              private starshipService: StarshipService) { }

  ngOnInit(): void {
    let teams = JSON.parse(sessionStorage.getItem('teams'));
    this.dataSource = new MatTableDataSource(teams ? teams : []);
    this.dataSource.paginator = this.paginator;
    this.planetService.getPlanetsForTeams().subscribe(planets => {
      this.planets = planets;
    });
    this.peopleService.getPeopleForTeams().subscribe(people => {
      this.people = people;
    });
    this.starshipService.getStarshipsForTeams().subscribe(starships => {
      this.starships = starships;
    })
  }

  addTeam() {
    let dialogRef = this.dialog.open(TeamCardComponent, {
      data: {
        planets: this.planets,
        people: this.people,
        starships: this.starships
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res.isTeamAddedOrEdited) {
        res.data.id = this.dataSource.data.length ? this.dataSource.data.length + 1 : 1;
        this.dataSource.data.push(res.data);
        this.dataSource.data = this.dataSource.data.slice();
        sessionStorage.setItem('teams', JSON.stringify(this.dataSource.data));
      }
    });
  }

  editTeam(row) {
    let dialogRef = this.dialog.open(TeamCardComponent, {
      data: {
        name: row.name,
        planet: row.planet,
        crew: row.crew,
        starship: row.starship,
        planets: this.planets,
        people: this.people,
        starships: this.starships

      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res.isTeamAddedOrEdited) {
        let i = this.dataSource.data.findIndex(o => o.id === row.id);
        res.data.id = row.id;
        this.dataSource.data[i] = res.data;
        this.dataSource.data = this.dataSource.data.slice();
        sessionStorage.setItem('teams', JSON.stringify(this.dataSource.data));
      }
    });
  }

  onTeamClick(row) {
    this.selectedTeamId = row.id;
  }

  deleteTeam() {
    let i = this.dataSource.data.findIndex(o => o.id === this.selectedTeamId);
    if (i !== -1) {
      this.dataSource.data.splice(i, 1);
      this.dataSource.data = this.dataSource.data.slice();
      sessionStorage.setItem('teams', JSON.stringify(this.dataSource.data));
    } else {
      this.dialog.open(ModalComponent, {
        data: {
          title: 'Выберите команду'
        },
        disableClose: true
      })
    }
  }
}
