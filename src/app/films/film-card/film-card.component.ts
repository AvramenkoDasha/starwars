import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {PersonCardComponent} from '../../people/person-card/person-card.component';
import {StarshipCardComponent} from '../../starships/starship-card/starship-card.component';
import {PlanetCardComponent} from '../../planets/planet-card/planet-card.component';
import {SpeciesCardComponent} from '../../species/species-card/species-card.component';
import {FormControl, FormGroup} from '@angular/forms';
import {FilmService} from '../../services/film.service';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.css']
})
export class FilmCardComponent implements OnInit {

  fields = [{
    name: 'title',
    label: 'Название'
  }, {
    name: 'director',
    label: 'Режиссер'
  }, {
    name: 'producers',
    label: 'Продюсеры'
  }, {
    name: 'releaseDate',
    label: 'Дата выхода'
  }];
  characters = [];
  characterId;
  starships = [];
  starshipId;
  planets = [];
  planetId;
  species = [];
  speciesId;
  hideFormGroup;
  filmsRating = [];
  rating;
  index;
  public form: FormGroup;

  constructor(public dialogRef: MatDialogRef<FilmCardComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private service: FilmService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.hideFormGroup = this.data.hide;
    this.form = new FormGroup({
      rating: new FormControl(),
    });
    this.service.getFilm(this.data.id).subscribe(film => {
      this.data = film;

      this.characters = this.data.characterConnection.characters;
      this.characterId = this.characters.length ? this.characters[0].id : '';

      this.starships = this.data.starshipConnection.starships;
      this.starshipId = this.starships.length ? this.starships[0].id : '';

      this.planets = this.data.planetConnection.planets;
      this.planetId = this.planets.length ? this.planets[0].id : '';

      this.species = this.data.speciesConnection.species;
      this.speciesId = this.species ? this.species[0].id : '';

      if (sessionStorage.getItem('filmsRating')) {
        this.filmsRating = JSON.parse(sessionStorage.getItem('filmsRating'));
      }
      this.index = this.filmsRating ? this.filmsRating.findIndex(f => f.id === film.id) : -1;
      this.form.get('rating').patchValue(this.index >= 0 ? this.filmsRating[this.index].rating : 0);
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
      this.filmsRating[this.index] = this.rating;
    } else {
      this.filmsRating.push(this.rating);
    }
    sessionStorage.setItem('filmsRating', JSON.stringify(this.filmsRating));
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

  openStarshipCard(id) {
    this.dialog.open(StarshipCardComponent, {
      data: {
        id,
        hide: true
      }
    });
  }

  openPlanetCard(id) {
    this.dialog.open(PlanetCardComponent, {
      data: {
        id,
        hide: true
      }
    });
  }

  openSpeciesCard(id) {
    this.dialog.open(SpeciesCardComponent, {
      data: {
        id,
        hide: true
      }
    });
  }
}
