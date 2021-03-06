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
import {MatDialog} from '@angular/material/dialog';
import {StarshipCardComponent} from './starship-card/starship-card.component';
import {StarshipService} from '../services/starship.service';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarshipsComponent implements OnInit, AfterViewInit, OnDestroy {

  columns = [{
    name: 'name',
    label: 'НАЗВАНИЕ'
  }, {
    name: 'model',
    label: 'МОДЕЛЬ'
  }, {
    name: 'starshipClass',
    label: 'КЛАСС'
  }, {
    name: 'maxAtmospheringSpeed',
    label: 'МАКСИМАЛЬНАЯ СКОРОСТЬ'
  }];
  dataSource = new MatTableDataSource<any>();
  search$ = new Subject<string>();
  pageIndex;
  pageSize;
  sortedHeader;

  public subscriptions: Subscription = new Subscription();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private starshipService: StarshipService, public dialog: MatDialog, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.subscriptions.add(this.starshipService.getStarships().subscribe(starships => {
      this.dataSource.data = starships;
      this.dataSource.paginator = this.paginator;
    }));

    this.sortedHeader = JSON.parse(sessionStorage.getItem('starshipsSort'));

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
      let dataStr = data.name + data.model + data.starshipClass + data.maxAtmospheringSpeed;
      dataStr = dataStr.trim().toLowerCase();
      return dataStr.indexOf(filter) !== -1;
    };

    sessionStorage.setItem('starshipsSearch', filterValue || '');
    this.dataSource.filter = filterValue;
  }

  openDialog(row: any) {
    this.subscriptions.add(this.starshipService.getStarship(row.id).subscribe(starship => {
      this.dialog.open(StarshipCardComponent, {
        data: {
          starship: starship
        },
        disableClose: true
      });
    }));
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
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
