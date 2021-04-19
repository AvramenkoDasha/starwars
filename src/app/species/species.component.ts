import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Subject} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {debounceTime, map} from 'rxjs/operators';
import {SpeciesCardComponent} from './species-card/species-card.component';
import {MatDialog} from '@angular/material/dialog';
import {SpeciesService} from '../services/species.service';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.css']
})
export class SpeciesComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'averageHeight', 'averageLifespan', 'language'];
  dataSource = new MatTableDataSource<any>();
  search$ = new Subject<string>();
  pageIndex;
  pageSize;
  sortedHeader;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: SpeciesService, public dialog: MatDialog, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.service.getSpecies().subscribe(species => {
      this.dataSource.data = species;
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
      let dataStr = data.name + data.averageHeight + data.averageLifespan + data.language;
      dataStr = dataStr.trim().toLowerCase();
      return dataStr.indexOf(filter) !== -1;
    };

    sessionStorage.setItem('speciesSearch', filterValue || '');
    this.dataSource.filter = filterValue;
  }

  openDialog(row: any) {
    this.dialog.open(SpeciesCardComponent, {
      data: {
        id: row.id
      }
    });
  }

  onPaginateChange(event) {
    sessionStorage.setItem('speciesPageIndex', event.pageIndex);
    sessionStorage.setItem('speciesPageSize', event.pageSize);
  }

  sortData(event) {
    this.sortedHeader = JSON.stringify(event);
    sessionStorage.setItem('speciesSort', this.sortedHeader);
  }

  ngAfterViewInit(): void {
    this.pageIndex = Number(sessionStorage.getItem('speciesPageIndex'));
    this.pageSize = Number(sessionStorage.getItem('speciesPageSize')) || 5;
    this.paginator.pageSize = this.pageSize;
    this.paginator.pageIndex = this.pageIndex;
    this.dataSource.filter = sessionStorage.getItem('speciesSearch');
    this.search$.next(sessionStorage.getItem('speciesSearch'));
    this.sortedHeader = JSON.parse(sessionStorage.getItem('speciesSort'));
    if (this.sortedHeader) {
      this.sort.active = this.sortedHeader.active;
      this.sort.direction = this.sortedHeader.direction;
      this.sort.sortChange.emit(this.sortedHeader);
    }
    this.cd.detectChanges();
  }
}
