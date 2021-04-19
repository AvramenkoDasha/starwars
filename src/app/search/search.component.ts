import {Component, Input, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() search$: Subject<string>;

constructor() { }

  ngOnInit(): void {
  }

}
