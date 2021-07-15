import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmCardComponent } from './film-card.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {CardComponent} from "../../card/card.component";
import {MatSelectModule} from "@angular/material/select";
import {StarRatingComponent} from "../../star-rating/star-rating.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('FilmCardComponent', () => {
  let component: FilmCardComponent;
  let fixture: ComponentFixture<FilmCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatDialogModule, MatSelectModule, FormsModule, ReactiveFormsModule ],
      declarations: [ FilmCardComponent, CardComponent, StarRatingComponent ],
      providers: [{ provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {}}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmCardComponent);
    component = fixture.componentInstance;
    component.data.film = {
      id: "ZmlsbXM6MQ==",
      title: "A New Hope",
      director: "George Lucas",
      producers: [
        "Gary Kurtz",
        "Rick McCallum"
      ],
      releaseDate: "1977-05-25",
      characterConnection: {
        characters: [
          {
            id: "cGVvcGxlOjE=",
            name: "Luke Skywalker"
          },
          {
            id: "cGVvcGxlOjI=",
            name: "C-3PO"
          },
          {
            id: "cGVvcGxlOjM=",
            name: "R2-D2"
          },
          {
            id: "cGVvcGxlOjQ=",
            name: "Darth Vader"
          },
          {
            id: "cGVvcGxlOjU=",
            name: "Leia Organa"
          },
          {
            id: "cGVvcGxlOjY=",
            name: "Owen Lars"
          },
          {
            id: "cGVvcGxlOjc=",
            name: "Beru Whitesun lars"
          },
          {
            id: "cGVvcGxlOjg=",
            name: "R5-D4"
          },
          {
            id: "cGVvcGxlOjk=",
            name: "Biggs Darklighter"
          },
          {
            id: "cGVvcGxlOjEw",
            name: "Obi-Wan Kenobi"
          },
          {
            id: "cGVvcGxlOjEy",
            name: "Wilhuff Tarkin"
          },
          {
            id: "cGVvcGxlOjEz",
            name: "Chewbacca"
          },
          {
            id: "cGVvcGxlOjE0",
            name: "Han Solo"
          },
          {
            id: "cGVvcGxlOjE1",
            name: "Greedo"
          },
          {
            id: "cGVvcGxlOjE2",
            name: "Jabba Desilijic Tiure"
          },
          {
            id: "cGVvcGxlOjE4",
            name: "Wedge Antilles"
          },
          {
            id: "cGVvcGxlOjE5",
            name: "Jek Tono Porkins"
          },
          {
            id: "cGVvcGxlOjgx",
            name: "Raymus Antilles"
          }
        ]
      },
      starshipConnection: {
        starships: [
          {
            id: "c3RhcnNoaXBzOjI=",
            name: "CR90 corvette"
          },
          {
            id: "c3RhcnNoaXBzOjM=",
            name: "Star Destroyer"
          },
          {
            id: "c3RhcnNoaXBzOjU=",
            name: "Sentinel-class landing craft"
          },
          {
            id: "c3RhcnNoaXBzOjk=",
            name: "Death Star"
          },
          {
            id: "c3RhcnNoaXBzOjEw",
            name: "Millennium Falcon"
          },
          {
            id: "c3RhcnNoaXBzOjEx",
            name: "Y-wing"
          },
          {
            id: "c3RhcnNoaXBzOjEy",
            name: "X-wing"
          },
          {
            id: "c3RhcnNoaXBzOjEz",
            name: "TIE Advanced x1"
          },
          {
            id: "c3RhcnNoaXBzOjI=",
            name: "CR90 corvette"
          },
          {
            id: "c3RhcnNoaXBzOjM=",
            name: "Star Destroyer"
          },
          {
            id: "c3RhcnNoaXBzOjU=",
            name: "Sentinel-class landing craft"
          },
          {
            id: "c3RhcnNoaXBzOjk=",
            name: "Death Star"
          },
          {
            id: "c3RhcnNoaXBzOjEw",
            name: "Millennium Falcon"
          },
          {
            id: "c3RhcnNoaXBzOjEx",
            name: "Y-wing"
          },
          {
            id: "c3RhcnNoaXBzOjEy",
            name: "X-wing"
          },
          {
            id: "c3RhcnNoaXBzOjEz",
            name: "TIE Advanced x1"
          }
        ]
      },
      planetConnection: {
        planets: [
          {
            id: "cGxhbmV0czox",
            name: "Tatooine"
          },
          {
            id: "cGxhbmV0czoy",
            name: "Alderaan"
          },
          {
            id: "cGxhbmV0czoz",
            name: "Yavin IV"
          },
          {
            id: "cGxhbmV0czox",
            name: "Tatooine"
          },
          {
            id: "cGxhbmV0czoy",
            name: "Alderaan"
          },
          {
            id: "cGxhbmV0czoz",
            name: "Yavin IV"
          }
        ]
      },
      speciesConnection: {
        species: [
          {
            id: "c3BlY2llczox",
            name: "Human"
          },
          {
            id: "c3BlY2llczoy",
            name: "Droid"
          },
          {
            id: "c3BlY2llczoz",
            name: "Wookie"
          },
          {
            id: "c3BlY2llczo0",
            name: "Rodian"
          },
          {
            id: "c3BlY2llczo1",
            name: "Hutt"
          },
          {
            id: "c3BlY2llczox",
            name: "Human"
          },
          {
            id: "c3BlY2llczoy",
            name: "Droid"
          },
          {
            id: "c3BlY2llczoz",
            name: "Wookie"
          },
          {
            id: "c3BlY2llczo0",
            name: "Rodian"
          },
          {
            id: "c3BlY2llczo1",
            name: "Hutt"
          }
        ]
      }
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component renders correctly', () => {
    let labels = fixture.debugElement.nativeElement.querySelectorAll('label');
    let values = fixture.debugElement.nativeElement.querySelectorAll('input');
    let selects = fixture.debugElement.nativeElement.querySelectorAll('mat-select');
    let buttons = fixture.debugElement.nativeElement.querySelectorAll('button');
    let stars = fixture.debugElement.nativeElement.querySelectorAll('li');

    expect(labels.length).toBe(8);
    expect(labels[0].textContent).toBe('Название');
    expect(labels[1].textContent).toBe('Режиссер');
    expect(labels[2].textContent).toBe('Продюсеры');
    expect(labels[3].textContent).toBe('Дата выхода');
    expect(labels[4].textContent).toBe('Персонажи');
    expect(labels[5].textContent).toBe('Звездолеты');
    expect(labels[6].textContent).toBe('Планеты');
    expect(labels[7].textContent).toBe('Расы');

    expect(values.length).toBe(4);
    expect(values[0].getAttribute('ng-reflect-model')).toBe('A New Hope');
    expect(values[1].getAttribute('ng-reflect-model')).toBe('George Lucas');
    expect(values[2].getAttribute('ng-reflect-model')).toBe('Gary Kurtz,Rick McCallum');
    expect(values[3].getAttribute('ng-reflect-model')).toBe('1977-05-25');

    expect(selects.length).toBe(4);
    expect(selects[0].getAttribute('ng-reflect-value')).toBe('cGVvcGxlOjE=');
    expect(selects[1].getAttribute('ng-reflect-value')).toBe('c3RhcnNoaXBzOjI=');
    expect(selects[2].getAttribute('ng-reflect-value')).toBe('cGxhbmV0czox');
    expect(selects[3].getAttribute('ng-reflect-value')).toBe('c3BlY2llczox');

    expect(buttons.length).toBe(5);
    expect(buttons[0].textContent).toBe('Персонаж');
    expect(buttons[1].textContent).toBe('Звездолет');
    expect(buttons[2].textContent).toBe('Планета');
    expect(buttons[3].textContent).toBe('Раса');
    expect(buttons[4].textContent).toBe('Закрыть');

    expect(stars.length).toBe(5);
  });

  it('character is triggered', () => {
    let spy = spyOn(component, 'openPersonCard');
    let button = fixture.debugElement.nativeElement.querySelectorAll('button')[0];
    button.click();
    expect(spy).toHaveBeenCalled();
  });

  it('starship is triggered', () => {
    let spy = spyOn(component, 'openStarshipCard');
    let button = fixture.debugElement.nativeElement.querySelectorAll('button')[1];
    button.click();
    expect(spy).toHaveBeenCalled();
  });

  it('planet is triggered', () => {
    let spy = spyOn(component, 'openPlanetCard');
    let button = fixture.debugElement.nativeElement.querySelectorAll('button')[2];
    button.click();
    expect(spy).toHaveBeenCalled();
  });

  it('species is triggered', () => {
    let spy = spyOn(component, 'openSpeciesCard');
    let button = fixture.debugElement.nativeElement.querySelectorAll('button')[3];
    button.click();
    expect(spy).toHaveBeenCalled();
  });

  it('close is triggered', () => {
    let spy = spyOn(component, 'close');
    let button = fixture.debugElement.nativeElement.querySelectorAll('button')[4];
    button.click();
    expect(spy).toHaveBeenCalled();
  });
});
