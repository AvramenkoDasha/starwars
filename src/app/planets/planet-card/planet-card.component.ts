import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {PersonCardComponent} from '../../people/person-card/person-card.component';
import {FilmCardComponent} from '../../films/film-card/film-card.component';
import {PeopleService} from "../../services/people.service";
import {FilmService} from "../../services/film.service";

@Component({
  selector: 'app-planet-card',
  templateUrl: './planet-card.component.html',
  styleUrls: ['./planet-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetCardComponent implements OnInit {

  fields = [{
    name: 'name',
    label: 'Название'
  }, {
    name: 'diameter',
    label: 'Диаметр'
  }, {
    name: 'gravity',
    label: 'Гравитация'
  }, {
    name: 'population',
    label: 'Население'
  }, {
    name: 'climates',
    label: 'Климат'
  }, {
    name: 'terrains',
    label: 'Местность'
  }, {
    name: 'surfaceWater',
    label: 'Процент воды'
  }];
  residents = [];
  residentId;
  films = [];
  filmId;
  hideFormGroup;

  constructor(public dialogRef: MatDialogRef<PlanetCardComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private peopleService: PeopleService,
              private filmService: FilmService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.hideFormGroup = this.data.hide;
    this.residents = this.data.planet.residentConnection.residents;
    this.residentId = this.residents.length ? this.residents[0].id : '';

    this.films = this.data.planet.filmConnection.films;
    this.filmId = this.films.length ? this.films[0].id : '';
  }

  close() {
    this.dialogRef.close();
  }

  openPersonCard(id) {
    this.peopleService.getPerson(id).subscribe(person => {
      this.dialog.open(PersonCardComponent, {
        data: {
          person: person,
          hide: true
        },
        disableClose: true
      });
    });
  }

  openFilmCard(id) {
    this.filmService.getFilm(id).subscribe(film => {
      this.dialog.open(FilmCardComponent, {
        data: {
          film: film,
          hide: true
        },
        disableClose: true
      });
    });
  }
}
