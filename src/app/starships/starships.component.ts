import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Subject} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {debounceTime} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {StarshipCardComponent} from './starship-card/starship-card.component';
import {StarshipService} from '../services/starship.service';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.css']
})
export class StarshipsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'model', 'starshipClass', 'maxAtmospheringSpeed'];
  dataSource = new MatTableDataSource<any>();
  search$ = new Subject<string>();
  pageIndex;
  pageSize;
  sortedHeader;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: StarshipService, public dialog: MatDialog, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.service.getStarships().subscribe(starships => {
      this.dataSource.data = starships;
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
      let dataStr = data.name + data.model + data.starshipClass + data.maxAtmospheringSpeed;
      dataStr = dataStr.trim().toLowerCase();
      return dataStr.indexOf(filter) !== -1;
    };

    sessionStorage.setItem('starshipsSearch', filterValue || '');
    this.dataSource.filter = filterValue;
  }

  openDialog(row: any) {
    this.dialog.open(StarshipCardComponent, {
      data: {
        id: row.id
      }
    });
  }

  onPaginateChange(event) {
    sessionStorage.setItem('starshipsPageIndex', event.pageIndex);
    sessionStorage.setItem('starshipsPageSize', event.pageSize);
  }

  sortData(event) {
    this.sortedHeader = JSON.stringify(event);
    sessionStorage.setItem('starshipsSort', this.sortedHeader);
  }

  ngAfterViewInit(): void {
    this.pageIndex = Number(sessionStorage.getItem('starshipsPageIndex'));
    this.pageSize = Number(sessionStorage.getItem('starshipsPageSize')) || 5;
    this.paginator.pageSize = this.pageSize;
    this.paginator.pageIndex = this.pageIndex;
    this.dataSource.filter = sessionStorage.getItem('starshipsSearch');
    this.search$.next(sessionStorage.getItem('starshipsSearch'));
    this.sortedHeader = JSON.parse(sessionStorage.getItem('starshipsSort'));
    if (this.sortedHeader) {
      this.sort.active = this.sortedHeader.active;
      this.sort.direction = this.sortedHeader.direction;
      this.sort.sortChange.emit(this.sortedHeader);
    }
    this.cd.detectChanges();
  }
}
