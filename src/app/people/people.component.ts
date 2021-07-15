import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Subject, Subscription} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {debounceTime} from 'rxjs/operators';
import {PersonCardComponent} from './person-card/person-card.component';
import {MatDialog} from '@angular/material/dialog';
import {PeopleService} from '../services/people.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleComponent implements OnInit, AfterViewInit, OnDestroy {

  columns = [{
    name: 'name',
    label: 'ИМЯ'
  }, {
    name: 'birthYear',
    label: 'ГОД РОЖДЕНИЯ'
  }, {
    name: 'eyeColor',
    label: 'ЦВЕТ ГЛАЗ'
  }, {
    name: 'hairColor',
    label: 'ЦВЕТ ВОЛОС'
  }, {
    name: 'skinColor',
    label: 'ЦВЕТ КОЖИ'
  }];
  dataSource = new MatTableDataSource<any>();
  search$ = new Subject<string>();
  pageIndex;
  pageSize;
  sortedHeader;

  public subscriptions: Subscription = new Subscription();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private peopleService: PeopleService, public dialog: MatDialog, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.subscriptions.add(this.peopleService.getPeople().subscribe(people => {
      this.dataSource.data = people;
      this.dataSource.paginator = this.paginator;
    }));

    this.sortedHeader = JSON.parse(sessionStorage.getItem('peopleSort'));

    this.subscriptions.add(this.search$
      .pipe(
        debounceTime(300)
      )
      .subscribe((value: string) => {
        this.applyFilter(value);
      }));
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
    this.subscriptions.add(this.peopleService.getPerson(row.id).subscribe(person => {
      this.dialog.open(PersonCardComponent, {
        data: {
          person: person
        },
        disableClose: true
      });
    }));
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
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
