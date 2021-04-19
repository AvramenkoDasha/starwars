import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {FilmCardComponent} from './film-card/film-card.component';
import {FilmService} from '../services/film.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['title', 'openingCrawl', 'releaseDate'];
  dataSource = new MatTableDataSource<any>();
  search$ = new Subject<string>();
  pageIndex;
  pageSize;
  sortedHeader;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: FilmService, public dialog: MatDialog, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.service.getFilms().subscribe(films => {
      this.dataSource.data = films;
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
      let dataStr = data.title + data.openingCrawl + data.releaseDate;
      dataStr = dataStr.trim().toLowerCase();
      return dataStr.indexOf(filter) !== -1;
    };

    sessionStorage.setItem('filmsSearch', filterValue || '');
    this.dataSource.filter = filterValue;
  }

  openDialog(row: any) {
    this.dialog.open(FilmCardComponent, {
      data: {
        id: row.id
      }
    });
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
    this.sortedHeader = JSON.parse(sessionStorage.getItem('filmsSort'));
    if (this.sortedHeader) {
      this.sort.active = this.sortedHeader.active;
      this.sort.direction = this.sortedHeader.direction;
      this.sort.sortChange.emit(this.sortedHeader);
    }
    this.cd.detectChanges();
  }
}
