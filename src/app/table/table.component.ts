import {
  AfterViewInit, ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, AfterViewInit {
  @Input() dataSource;
  @Input() columns;
  @Input() sortedHeader;

  @Output() onDblClick = new EventEmitter();
  @Output() onClick = new EventEmitter();
  @Output() sortData = new EventEmitter();

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns;
  selectedRowIndex = -1;

  constructor() { }

  ngOnInit(): void {
    this.displayedColumns = this.columns.map(a => a.name);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    if (this.sortedHeader) {
      this.sort.active = this.sortedHeader.active;
      this.sort.direction = this.sortedHeader.direction;
      this.sort.sortChange.emit(this.sortedHeader);
    }
  }

  selectRow(row) {
    this.selectedRowIndex = row.id;
  }
}
