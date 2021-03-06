import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {

  links = [
    {
      name: 'Фильмы',
      router: 'films'
    },
    {
      name: 'Персонажи',
      router: 'people'
    },
    {
      name: 'Звездолеты',
      router: 'starships'
    },
    {
      name: 'Планеты',
      router: 'planets'
    },
    {
      name: 'Расы',
      router: 'species'
    },
    {
      name: 'Команды',
      router: 'teams'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
