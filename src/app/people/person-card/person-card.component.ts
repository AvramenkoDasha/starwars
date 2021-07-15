import {ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FilmCardComponent} from '../../films/film-card/film-card.component';
import {StarshipCardComponent} from '../../starships/starship-card/starship-card.component';
import {FilmService} from "../../services/film.service";
import {StarshipService} from "../../services/starship.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonCardComponent implements OnInit, OnDestroy {

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

  public subscriptions: Subscription = new Subscription();

  constructor(public dialogRef: MatDialogRef<PersonCardComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private filmService: FilmService,
              private starshipService: StarshipService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.hideFormGroup = this.data.hide;
    this.films = this.data.person.filmConnection.films;
    this.filmId = this.films.length ? this.films[0].id : '';

    this.starships = this.data.person.starshipConnection.starships;
    this.starshipId = this.starships.length ? this.starships[0].id : '';
  }

  close() {
    this.dialogRef.close();
  }

  openFilmCard(id) {
    this.subscriptions.add(this.filmService.getFilm(id).subscribe(film => {
      this.dialog.open(FilmCardComponent, {
        data: {
          film: film,
          hide: true
        },
        disableClose: true
      });
    }));
  }

  openStarshipCard(id) {
    this.subscriptions.add(this.starshipService.getStarship(id).subscribe(starship => {
      this.dialog.open(StarshipCardComponent, {
        data: {
          starship: starship,
          hide: true
        },
        disableClose: true
      });
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
