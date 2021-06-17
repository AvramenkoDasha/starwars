import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Subject} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {debounceTime} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {PlanetCardComponent} from './planet-card/planet-card.component';
import {PlanetService} from '../services/planet.service';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetsComponent implements OnInit, AfterViewInit {

  columns = [{
    name: 'name',
    label: 'НАЗВАНИЕ'
  }, {
    name: 'population',
    label: 'НАСЕЛЕНИЕ'
  }, {
    name: 'climates',
    label: 'КЛИМАТ'
  }, {
    name: 'terrains',
    label: 'МЕСТНОСТЬ'
  }];
  dataSource = new MatTableDataSource<any>();
  search$ = new Subject<string>();
  pageIndex;
  pageSize;
  sortedHeader;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private planetService: PlanetService, public dialog: MatDialog, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.planetService.getPlanets().subscribe(planets => {
      this.dataSource.data = planets;
      this.dataSource.paginator = this.paginator;
    });

    this.sortedHeader = JSON.parse(sessionStorage.getItem('planetsSort'));

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
      let dataStr = data.name + data.population + data.climates + data.terrains;
      dataStr = dataStr.trim().toLowerCase();
      return dataStr.indexOf(filter) !== -1;
    };

    sessionStorage.setItem('planetsSearch', filterValue || '');
    this.dataSource.filter = filterValue;
  }

  openDialog(row: any) {
    this.planetService.getPlanet(row.id).subscribe(planet => {
      this.dialog.open(PlanetCardComponent, {
        data: {
          planet: planet
        },
        disableClose: true
      });
    });
  }

  onPaginateChange(event) {
    sessionStorage.setItem('planetsPageIndex', event.pageIndex);
    sessionStorage.setItem('planetsPageSize', event.pageSize);
  }

  sortData(event) {
    this.sortedHeader = JSON.stringify(event);
    sessionStorage.setItem('planetsSort', this.sortedHeader);
  }

  ngAfterViewInit(): void {
    this.pageIndex = Number(sessionStorage.getItem('planetsPageIndex'));
    this.pageSize = Number(sessionStorage.getItem('planetsPageSize')) || 5;
    this.paginator.pageSize = this.pageSize;
    this.paginator.pageIndex = this.pageIndex;
    this.dataSource.filter = sessionStorage.getItem('planetsSearch');
    this.search$.next(sessionStorage.getItem('planetsSearch'));
    this.cd.detectChanges();
  }
}
