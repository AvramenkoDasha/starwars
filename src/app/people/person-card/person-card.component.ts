import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FilmCardComponent} from '../../films/film-card/film-card.component';
import {StarshipCardComponent} from '../../starships/starship-card/starship-card.component';
import {PeopleService} from '../../services/people.service';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.css']
})
export class PersonCardComponent implements OnInit {

  fields = [{
    name: 'name',
    label: 'Имя'
  }, {
    name: 'birthYear',
    label: 'Год рождения'
  }, {
    name: 'eyeColor',
    label: 'Цвет глаз'
  }, {
    name: 'gender',
    label: 'Пол'
  }, {
      name: 'hairColor',
      label: 'Цвет волос'
  }, {
    name: 'height',
    label: 'Рост'
  }, {
    name: 'mass',
    label: 'Вес'
  }, {
    name: 'skinColor',
    label: 'Цвет кожи'
  }];
  films = [];
  filmId;
  starships = [];
  starshipId;
  hideFormGroup;

  constructor(public dialogRef: MatDialogRef<PersonCardComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private service: PeopleService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.hideFormGroup = this.data.hide;
    this.service.getPerson(this.data.id).subscribe(person => {
      this.data = person;

      this.films = this.data.filmConnection.films;
      this.filmId = this.films.length ? this.films[0].id : '';

      this.starships = this.data.starshipConnection.starships;
      this.starshipId = this.starships.length ? this.starships[0].id : '';
    });
  }

  close() {
    this.dialogRef.close();
  }

  openFilmCard(id) {
    this.dialog.open(FilmCardComponent, {
      data: {
        id,
        hide: true
      }
    });
  }

  openStarshipCard(id) {
    this.dialog.open(StarshipCardComponent, {
      data: {
        id,
        hide: true
      }
    });
  }
}
