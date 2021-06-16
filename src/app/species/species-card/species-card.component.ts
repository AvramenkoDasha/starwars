import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {PersonCardComponent} from '../../people/person-card/person-card.component';
import {FilmCardComponent} from '../../films/film-card/film-card.component';
import {SpeciesService} from '../../services/species.service';

@Component({
  selector: 'app-species-card',
  templateUrl: './species-card.component.html',
  styleUrls: ['./species-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeciesCardComponent implements OnInit {

  fields = [{
    name: 'name',
    label: 'Название'
  }, {
    name: 'averageHeight',
    label: 'Средний рост'
  }, {
    name: 'averageLifespan',
    label: 'Средняя продолжительность жизни'
  }, {
    name: 'eyeColors',
    label: 'Цвет глаз'
  }, {
    name: 'hairColors',
    label: 'Цвет волос'
  }, {
    name: 'skinColors',
    label: 'Цвет кожи'
  }, {
    name: 'language',
    label: 'Язык'
  }];
  people = [];
  personId;
  films = [];
  filmId;
  hideFormGroup;

  constructor(public dialogRef: MatDialogRef<SpeciesCardComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private service: SpeciesService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.hideFormGroup = this.data.hide;
    this.service.getKind(this.data.id).subscribe(species => {
      this.data = species;

      this.people = this.data.personConnection.people;
      this.personId = this.people.length ? this.people[0].id : '';

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
