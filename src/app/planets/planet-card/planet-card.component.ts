import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {PersonCardComponent} from '../../people/person-card/person-card.component';
import {FilmCardComponent} from '../../films/film-card/film-card.component';
import {PlanetService} from '../../services/planet.service';

@Component({
  selector: 'app-planet-card',
  templateUrl: './planet-card.component.html',
  styleUrls: ['./planet-card.component.css']
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
              @Inject(MAT_DIALOG_DATA) public data: any, private service: PlanetService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.hideFormGroup = this.data.hide;
    this.service.getPlanet(this.data.id).subscribe(planet => {
      this.data = planet;

      this.residents = this.data.residentConnection.residents;
      this.residentId = this.residents.length ? this.residents[0].id : '';

      this.films = this.data.filmConnection.films;
      this.filmId = this.films.length ? this.films[0].id : '';
    });
  }

  close() {
    this.dialogRef.close();
  }

  openPersonCard(id) {
    this.dialog.open(PersonCardComponent, {
      data: {
        id,
        hide: true
      }
    });
  }

  openFilmCard(id) {
    this.dialog.open(FilmCardComponent, {
      data: {
        id,
        hide: true
      }
    });
  }
}
