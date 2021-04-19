import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Subject} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {debounceTime} from 'rxjs/operators';
import {PersonCardComponent} from './person-card/person-card.component';
import {MatDialog} from '@angular/material/dialog';
import {PeopleService} from '../services/people.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'birthYear', 'eyeColor', 'hairColor', 'skinColor'];
  dataSource = new MatTableDataSource<any>();
  search$ = new Subject<string>();
  pageIndex;
  pageSize;
  sortedHeader;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: PeopleService, public dialog: MatDialog, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.service.getPeople().subscribe(people => {
      this.dataSource.data = people;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.search$
      .pipe(
        debounceTime(300)
      )
      .subscribe((value: string) => {
        this.applyFilter(value);
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filterPredicate = (data, filter) => {
      filter = filter.trim().toLowerCase();
      let dataStr = data.name + data.birthYear + data.eyeColor + data.hairColor + data.skinColor;
      dataStr = dataStr.trim().toLowerCase();
      return dataStr.indexOf(filter) !== -1;
    };

    sessionStorage.setItem('peopleSearch', filterValue || '');
    this.dataSource.filter = filterValue;
  }

  openDialog(row: any) {
    this.dialog.open(PersonCardComponent, {
      data: {
        id: row.id
      }
    });
  }

  onPaginateChange(event) {
    sessionStorage.setItem('peoplePageIndex', event.pageIndex);
    sessionStorage.setItem('peoplePageSize', event.pageSize);
  }

  sortData(event) {
    this.sortedHeader = JSON.stringify(event);
    sessionStorage.setItem('peopleSort', this.sortedHeader);
  }

  ngAfterViewInit(): void {
    this.pageIndex = Number(sessionStorage.getItem('peoplePageIndex'));
    this.pageSize = Number(sessionStorage.getItem('peoplePageSize')) || 5;
    this.paginator.pageSize = this.pageSize;
    this.paginator.pageIndex = this.pageIndex;
    this.dataSource.filter = sessionStorage.getItem('peopleSearch');
    this.search$.next(sessionStorage.getItem('peopleSearch'));
    this.sortedHeader = JSON.parse(sessionStorage.getItem('peopleSort'));
    if (this.sortedHeader) {
      this.sort.active = this.sortedHeader.active;
      this.sort.direction = this.sortedHeader.direction;
      this.sort.sortChange.emit(this.sortedHeader);
    }
    this.cd.detectChanges();
  }
}
