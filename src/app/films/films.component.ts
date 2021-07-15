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
import {debounceTime} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {FilmCardComponent} from './film-card/film-card.component';
import {FilmService} from '../services/film.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmsComponent implements OnInit, AfterViewInit, OnDestroy {

  columns = [{
    name: 'title',
    label: 'НАЗВАНИЕ'
  }, {
    name: 'openingCrawl',
    label: 'ВСТУПИТЕЛЬНЫЕ ТИТРЫ'
  }, {
    name: 'releaseDate',
    label: 'ДАТА ВЫХОДА'
  }];
  dataSource = new MatTableDataSource<any>();
  search$ = new Subject<string>();
  pageIndex;
  pageSize;
  sortedHeader;

  public subscriptions: Subscription = new Subscription();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private filmService: FilmService, public dialog: MatDialog, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.subscriptions.add(this.filmService.getFilms().subscribe(films => {
      this.dataSource.data = films;
      this.dataSource.paginator = this.paginator;
    }));

    this.sortedHeader = JSON.parse(sessionStorage.getItem('filmsSort'));

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
      let dataStr = data.title + data.openingCrawl + data.releaseDate;
      dataStr = dataStr.trim().toLowerCase();
      return dataStr.indexOf(filter) !== -1;
    };

    sessionStorage.setItem('filmsSearch', filterValue || '');
    this.dataSource.filter = filterValue;
  }

  openDialog(row: any) {
    this.subscriptions.add(this.filmService.getFilm(row.id).subscribe(film => {
      this.dialog.open(FilmCardComponent, {
        data: {
          film: film
        },
        disableClose: true
      });
    }));
  }

  onPaginateChange(event) {
    sessionStorage.setItem('filmsPageIndex', event.pageIndex);
    sessionStorage.setItem('filmsPageSize', event.pageSize);
  }

  sortData(event) {
    this.sortedHeader = JSON.stringify(event);
    sessionStorage.setItem('filmsSort', this.sortedHeader);
  }

  ngAfterViewInit(): void {
    this.pageIndex = Number(sessionStorage.getItem('filmsPageIndex'));
    this.pageSize = Number(sessionStorage.getItem('filmsPageSize')) || 5;
    this.paginator.pageSize = this.pageSize;
    this.paginator.pageIndex = this.pageIndex;
    this.dataSource.filter = sessionStorage.getItem('filmsSearch');
    this.search$.next(sessionStorage.getItem('filmsSearch'));
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
