import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import {FormsModule} from "@angular/forms";

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ CardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.fields = [{
      name: 'title',
      label: 'Название'
    }, {
      name: 'director',
      label: 'Режиссер'
    }];
    component.data = {
      title: 'A New Hope',
      director: 'George Lucas'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component renders correctly', () => {
    let labels = fixture.debugElement.nativeElement.querySelectorAll('label');
    let values = fixture.debugElement.nativeElement.querySelectorAll('input');

    expect(labels.length).toBe(2);
    expect(labels[0].textContent).toBe('Название');
    expect(labels[1].textContent).toBe('Режиссер');
    expect(values.length).toBe(2);
    expect(values[0].getAttribute('ng-reflect-model')).toBe('A New Hope');
    expect(values[1].getAttribute('ng-reflect-model')).toBe('George Lucas');
  })
});
