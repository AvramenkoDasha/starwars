import {async, ComponentFixture, TestBed, tick} from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatDialogModule ],
      declarations: [ ModalComponent ],
      providers: [{ provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {}}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    component.data.title = 'Заполните все поля';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component renders correctly', () => {
    let header = fixture.debugElement.nativeElement.querySelector('h1');
    let button = fixture.debugElement.nativeElement.querySelector('button');

    expect(header.textContent).toBe('Заполните все поля');
    expect(button.textContent).toBe('ОК');
  });

  it('close is triggered', () => {
    let spy = spyOn(component, 'close');
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(spy).toHaveBeenCalled();
  });
});
