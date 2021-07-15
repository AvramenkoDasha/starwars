import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterTestingModule} from "@angular/router/testing";

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatToolbarModule, RouterTestingModule ],
      declarations: [ NavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component renders correctly', () => {
    let buttons = fixture.debugElement.nativeElement.querySelectorAll('a');

    expect(buttons[0].textContent).toBe('Фильмы');
    expect(buttons[1].textContent).toBe('Персонажи');
    expect(buttons[2].textContent).toBe('Звездолеты');
    expect(buttons[3].textContent).toBe('Планеты');
    expect(buttons[4].textContent).toBe('Расы');
    expect(buttons[5].textContent).toBe('Команды');
  });
});
