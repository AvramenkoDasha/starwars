import {ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {PersonCardComponent} from '../../people/person-card/person-card.component';
import {StarshipCardComponent} from '../../starships/starship-card/starship-card.component';
import {PlanetCardComponent} from '../../planets/planet-card/planet-card.component';
import {SpeciesCardComponent} from '../../species/species-card/species-card.component';
import {FormControl, FormGroup} from '@angular/forms';
import {PeopleService} from "../../services/people.service";
import {StarshipService} from "../../services/starship.service";
import {PlanetService} from "../../services/planet.service";
import {SpeciesService} from "../../services/species.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmCardComponent implements OnInit, OnDestroy {

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

  public subscriptions: Subscription = new Subscription();

  constructor(public dialogRef: MatDialogRef<FilmCardComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private peopleService: PeopleService,
              private starshipService: StarshipService,
              private planetService: PlanetService,
              private speciesService: SpeciesService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.hideFormGroup = this.data.hide;
    this.form = new FormGroup({
      rating: new FormControl(),
    });
    this.characters = this.data.film.characterConnection.characters;
    this.characterId = this.characters.length ? this.characters[0].id : '';

    this.starships = this.data.film.starshipConnection.starships;
    this.starshipId = this.starships.length ? this.starships[0].id : '';

    this.planets = this.data.film.planetConnection.planets;
    this.planetId = this.planets.length ? this.planets[0].id : '';

    this.species = this.data.film.speciesConnection.species;
    this.speciesId = this.species ? this.species[0].id : '';

    if (sessionStorage.getItem('filmsRating')) {
      this.filmsRating = JSON.parse(sessionStorage.getItem('filmsRating'));
    }
    this.index = this.filmsRating ? this.filmsRating.findIndex(f => f.id === this.data.film.id) : -1;
    this.form.get('rating').patchValue(this.index >= 0 ? this.filmsRating[this.index].rating : 0);
    if (this.hideFormGroup) {
      this.form.get('rating').disable(this.hideFormGroup);
    }
  }

  close() {
    this.rating = {
      id: this.data.film.id,
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
    this.subscriptions.add(this.peopleService.getPerson(id).subscribe(person => {
      this.dialog.open(PersonCardComponent, {
        data: {
          person: person,
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

  openPlanetCard(id) {
    this.subscriptions.add(this.planetService.getPlanet(id).subscribe(planet => {
      this.dialog.open(PlanetCardComponent, {
        data: {
          planet: planet,
          hide: true
        },
        disableClose: true
      });
    }));
  }

  openSpeciesCard(id) {
    this.subscriptions.add(this.speciesService.getKind(id).subscribe(species => {
      this.dialog.open(SpeciesCardComponent, {
        data: {
          species: species,
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
