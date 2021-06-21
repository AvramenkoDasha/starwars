import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarshipSelectComponent } from './starship-select.component';

describe('StarshipSelectComponent', () => {
  let component: StarshipSelectComponent;
  let fixture: ComponentFixture<StarshipSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarshipSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarshipSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
