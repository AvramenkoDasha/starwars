import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {PersonCardComponent} from '../../people/person-card/person-card.component';
import {FilmCardComponent} from '../../films/film-card/film-card.component';
import {FormControl, FormGroup} from '@angular/forms';
import {StarshipService} from '../../services/starship.service';

@Component({
  selector: 'app-starship-card',
  templateUrl: './starship-card.component.html',
  styleUrls: ['./starship-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarshipCardComponent implements OnInit {

  fields = [{
    name: 'name',
    label: 'Название'
  }, {
    name: 'model',
    label: 'Модель'
  }, {
    name: 'starshipClass',
    label: 'Класс'
  }, {
    name: 'costInCredits',
    label: 'Стоимость'
  }, {
    name: 'length',
    label: 'Длина'
  }, {
    name: 'crew',
    label: 'Количество членов экипажа'
  }, {
    name: 'passengers',
    label: 'Количество пассажиров'
  }, {
    name: 'maxAtmospheringSpeed',
    label: 'Максимальная скорость'
  }];
  pilots = [];
  pilotId;
  films = [];
  filmId;
  hideFormGroup;
  starshipsRating = [];
  rating;
  index;
  stars;
  public form: FormGroup;

  constructor(public dialogRef: MatDialogRef<StarshipCardComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private service: StarshipService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.hideFormGroup = this.data.hide;
    this.form = new FormGroup({
      rating: new FormControl(),
    });
    this.service.getStarship(this.data.id).subscribe(starship => {
      this.data = starship;

      this.pilots = this.data.pilotConnection.pilots;
      this.pilotId = this.pilots.length ? this.pilots[0].id : '';

      this.films = this.data.filmConnection.films;
      this.filmId = this.films.length ? this.films[0].id : '';

      if (sessionStorage.getItem('starshipsRating')) {
        this.starshipsRating = JSON.parse(sessionStorage.getItem('starshipsRating'));
      }
      this.index = this.starshipsRating ? this.starshipsRating.findIndex(f => f.id === starship.id) : -1;
      this.form.get('rating').patchValue(this.index >= 0 ? this.starshipsRating[this.index].rating : 0);
      if (this.hideFormGroup) {
        this.form.get('rating').disable(this.hideFormGroup);
      }
    });
  }

  close() {
    this.rating = {
      id: this.data.id,
      rating: this.form.value.rating
    };
    if (this.index >= 0) {
      this.starshipsRating[this.index] = this.rating;
    } else {
      this.starshipsRating.push(this.rating);
    }
    sessionStorage.setItem('starshipsRating', JSON.stringify(this.starshipsRating));
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
