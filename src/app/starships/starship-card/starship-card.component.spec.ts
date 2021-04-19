import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarshipCardComponent } from './starship-card.component';

describe('StarshipCardComponent', () => {
  let component: StarshipCardComponent;
  let fixture: ComponentFixture<StarshipCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarshipCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarshipCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
