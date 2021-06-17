import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Subject} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {debounceTime} from 'rxjs/operators';
import {SpeciesCardComponent} from './species-card/species-card.component';
import {MatDialog} from '@angular/material/dialog';
import {SpeciesService} from '../services/species.service';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeciesComponent implements OnInit, AfterViewInit {

  columns = [{
    name: 'name',
    label: 'НАЗВАНИЕ'
  }, {
    name: 'averageHeight',
    label: 'СРЕДНИЙ РОСТ'
  }, {
    name: 'averageLifespan',
    label: 'СРЕДНЯЯ ПРОДОЛЖИТЕЛЬНОСТЬ ЖИЗНИ'
  }, {
    name: 'language',
    label: 'ЯЗЫК'
  }];
  dataSource = new MatTableDataSource<any>();
  search$ = new Subject<string>();
  pageIndex;
  pageSize;
  sortedHeader;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private speciesService: SpeciesService, public dialog: MatDialog, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.speciesService.getSpecies().subscribe(species => {
      this.dataSource.data = species;
      this.dataSource.paginator = this.paginator;
    });

    this.sortedHeader = JSON.parse(sessionStorage.getItem('speciesSort'));

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
    this.speciesService.getKind(row.id).subscribe(species => {
      this.dialog.open(SpeciesCardComponent, {
        data: {
          species: species
        },
        disableClose: true
      });
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
    this.cd.detectChanges();
  }
}
