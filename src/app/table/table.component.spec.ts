import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatTableModule ],
      declarations: [ TableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    let dataSource = new MatTableDataSource<any>();
    dataSource.data = [
      {
        id: "ZmlsbXM6MQ==",
        title: "A New Hope",
        releaseDate: "1977-05-25"
      },
      {
        id: "ZmlsbXM6Mg==",
        title: "The Empire Strikes Back",
        releaseDate: "1980-05-17"
      }
    ];
    component.columns = [{
      name: 'title',
      label: 'НАЗВАНИЕ'
    }, {
      name: 'releaseDate',
      label: 'ДАТА ВЫХОДА'
    }];
    component.dataSource = dataSource;
    component.sortedHeader = null;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component renders correctly', () => {
    let headerCells = fixture.debugElement.nativeElement.querySelectorAll('mat-header-cell');
    let rows = fixture.debugElement.nativeElement.querySelectorAll('mat-row');
    let firstRow = rows[0].querySelectorAll('mat-cell');
    let secondRow = rows[1].querySelectorAll('mat-cell');

    expect(headerCells[0].textContent).toBe('НАЗВАНИЕ');
    expect(headerCells[1].textContent).toBe('ДАТА ВЫХОДА');

    expect(firstRow[0].textContent).toBe('A New Hope');
    expect(firstRow[1].textContent).toBe('1977-05-25');

    expect(secondRow[0].textContent).toBe('The Empire Strikes Back');
    expect(secondRow[1].textContent).toBe('1980-05-17');
  });
});
