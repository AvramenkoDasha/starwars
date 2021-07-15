import { TestBed } from '@angular/core/testing';
import { FilmService } from './film.service';
import {of} from "rxjs";

const films = [
  {
    id: "ZmlsbXM6MQ==",
    title: "A New Hope",
    openingCrawl: "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
    releaseDate: "1977-05-25"
  },
  {
    id: "ZmlsbXM6Mg==",
    title: "The Empire Strikes Back",
    openingCrawl: "It is a dark time for the\r\nRebellion. Although the Death\r\nStar has been destroyed,\r\nImperial troops have driven the\r\nRebel forces from their hidden\r\nbase and pursued them across\r\nthe galaxy.\r\n\r\nEvading the dreaded Imperial\r\nStarfleet, a group of freedom\r\nfighters led by Luke Skywalker\r\nhas established a new secret\r\nbase on the remote ice world\r\nof Hoth.\r\n\r\nThe evil lord Darth Vader,\r\nobsessed with finding young\r\nSkywalker, has dispatched\r\nthousands of remote probes into\r\nthe far reaches of space....",
    releaseDate: "1980-05-17"
  },
  {
    id: "ZmlsbXM6Mw==",
    title: "Return of the Jedi",
    openingCrawl: "Luke Skywalker has returned to\r\nhis home planet of Tatooine in\r\nan attempt to rescue his\r\nfriend Han Solo from the\r\nclutches of the vile gangster\r\nJabba the Hutt.\r\n\r\nLittle does Luke know that the\r\nGALACTIC EMPIRE has secretly\r\nbegun construction on a new\r\narmored space station even\r\nmore powerful than the first\r\ndreaded Death Star.\r\n\r\nWhen completed, this ultimate\r\nweapon will spell certain doom\r\nfor the small band of rebels\r\nstruggling to restore freedom\r\nto the galaxy...",
    releaseDate: "1983-05-25"
  },
  {
    id: "ZmlsbXM6NA==",
    title: "The Phantom Menace",
    openingCrawl: "Turmoil has engulfed the\r\nGalactic Republic. The taxation\r\nof trade routes to outlying star\r\nsystems is in dispute.\r\n\r\nHoping to resolve the matter\r\nwith a blockade of deadly\r\nbattleships, the greedy Trade\r\nFederation has stopped all\r\nshipping to the small planet\r\nof Naboo.\r\n\r\nWhile the Congress of the\r\nRepublic endlessly debates\r\nthis alarming chain of events,\r\nthe Supreme Chancellor has\r\nsecretly dispatched two Jedi\r\nKnights, the guardians of\r\npeace and justice in the\r\ngalaxy, to settle the conflict....",
    releaseDate: "1999-05-19"
  },
  {
    id: "ZmlsbXM6NQ==",
    title: "Attack of the Clones",
    openingCrawl: "There is unrest in the Galactic\r\nSenate. Several thousand solar\r\nsystems have declared their\r\nintentions to leave the Republic.\r\n\r\nThis separatist movement,\r\nunder the leadership of the\r\nmysterious Count Dooku, has\r\nmade it difficult for the limited\r\nnumber of Jedi Knights to maintain \r\npeace and order in the galaxy.\r\n\r\nSenator Amidala, the former\r\nQueen of Naboo, is returning\r\nto the Galactic Senate to vote\r\non the critical issue of creating\r\nan ARMY OF THE REPUBLIC\r\nto assist the overwhelmed\r\nJedi....",
    releaseDate: "2002-05-16"
  },
  {
    id: "ZmlsbXM6Ng==",
    title: "Revenge of the Sith",
    openingCrawl: "War! The Republic is crumbling\r\nunder attacks by the ruthless\r\nSith Lord, Count Dooku.\r\nThere are heroes on both sides.\r\nEvil is everywhere.\r\n\r\nIn a stunning move, the\r\nfiendish droid leader, General\r\nGrievous, has swept into the\r\nRepublic capital and kidnapped\r\nChancellor Palpatine, leader of\r\nthe Galactic Senate.\r\n\r\nAs the Separatist Droid Army\r\nattempts to flee the besieged\r\ncapital with their valuable\r\nhostage, two Jedi Knights lead a\r\ndesperate mission to rescue the\r\ncaptive Chancellor....",
    releaseDate: "2005-05-19"
  }
];

const film = {
  id: "ZmlsbXM6MQ==",
  title: "A New Hope",
  director: "George Lucas",
  producers: [
    "Gary Kurtz",
    "Rick McCallum"
  ],
  releaseDate: "1977-05-25",
  characterConnection: {
    characters: [
      {
        id: "cGVvcGxlOjE=",
        name: "Luke Skywalker"
      },
      {
        id: "cGVvcGxlOjI=",
        name: "C-3PO"
      },
      {
        id: "cGVvcGxlOjM=",
        name: "R2-D2"
      },
      {
        id: "cGVvcGxlOjQ=",
        name: "Darth Vader"
      },
      {
        id: "cGVvcGxlOjU=",
        name: "Leia Organa"
      },
      {
        id: "cGVvcGxlOjY=",
        name: "Owen Lars"
      },
      {
        id: "cGVvcGxlOjc=",
        name: "Beru Whitesun lars"
      },
      {
        id: "cGVvcGxlOjg=",
        name: "R5-D4"
      },
      {
        id: "cGVvcGxlOjk=",
        name: "Biggs Darklighter"
      },
      {
        id: "cGVvcGxlOjEw",
        name: "Obi-Wan Kenobi"
      },
      {
        id: "cGVvcGxlOjEy",
        name: "Wilhuff Tarkin"
      },
      {
        id: "cGVvcGxlOjEz",
        name: "Chewbacca"
      },
      {
        id: "cGVvcGxlOjE0",
        name: "Han Solo"
      },
      {
        id: "cGVvcGxlOjE1",
        name: "Greedo"
      },
      {
        id: "cGVvcGxlOjE2",
        name: "Jabba Desilijic Tiure"
      },
      {
        id: "cGVvcGxlOjE4",
        name: "Wedge Antilles"
      },
      {
        id: "cGVvcGxlOjE5",
        name: "Jek Tono Porkins"
      },
      {
        id: "cGVvcGxlOjgx",
        name: "Raymus Antilles"
      }
    ]
  },
  starshipConnection: {
    starships: [
      {
        id: "c3RhcnNoaXBzOjI=",
        name: "CR90 corvette"
      },
      {
        id: "c3RhcnNoaXBzOjM=",
        name: "Star Destroyer"
      },
      {
        id: "c3RhcnNoaXBzOjU=",
        name: "Sentinel-class landing craft"
      },
      {
        id: "c3RhcnNoaXBzOjk=",
        name: "Death Star"
      },
      {
        id: "c3RhcnNoaXBzOjEw",
        name: "Millennium Falcon"
      },
      {
        id: "c3RhcnNoaXBzOjEx",
        name: "Y-wing"
      },
      {
        id: "c3RhcnNoaXBzOjEy",
        name: "X-wing"
      },
      {
        id: "c3RhcnNoaXBzOjEz",
        name: "TIE Advanced x1"
      },
      {
        id: "c3RhcnNoaXBzOjI=",
        name: "CR90 corvette"
      },
      {
        id: "c3RhcnNoaXBzOjM=",
        name: "Star Destroyer"
      },
      {
        id: "c3RhcnNoaXBzOjU=",
        name: "Sentinel-class landing craft"
      },
      {
        id: "c3RhcnNoaXBzOjk=",
        name: "Death Star"
      },
      {
        id: "c3RhcnNoaXBzOjEw",
        name: "Millennium Falcon"
      },
      {
        id: "c3RhcnNoaXBzOjEx",
        name: "Y-wing"
      },
      {
        id: "c3RhcnNoaXBzOjEy",
        name: "X-wing"
      },
      {
        id: "c3RhcnNoaXBzOjEz",
        name: "TIE Advanced x1"
      }
    ]
  },
  planetConnection: {
    planets: [
      {
        id: "cGxhbmV0czox",
        name: "Tatooine"
      },
      {
        id: "cGxhbmV0czoy",
        name: "Alderaan"
      },
      {
        id: "cGxhbmV0czoz",
        name: "Yavin IV"
      },
      {
        id: "cGxhbmV0czox",
        name: "Tatooine"
      },
      {
        id: "cGxhbmV0czoy",
        name: "Alderaan"
      },
      {
        id: "cGxhbmV0czoz",
        name: "Yavin IV"
      }
    ]
  },
  speciesConnection: {
    species: [
      {
        id: "c3BlY2llczox",
        name: "Human"
      },
      {
        id: "c3BlY2llczoy",
        name: "Droid"
      },
      {
        id: "c3BlY2llczoz",
        name: "Wookie"
      },
      {
        id: "c3BlY2llczo0",
        name: "Rodian"
      },
      {
        id: "c3BlY2llczo1",
        name: "Hutt"
      },
      {
        id: "c3BlY2llczox",
        name: "Human"
      },
      {
        id: "c3BlY2llczoy",
        name: "Droid"
      },
      {
        id: "c3BlY2llczoz",
        name: "Wookie"
      },
      {
        id: "c3BlY2llczo0",
        name: "Rodian"
      },
      {
        id: "c3BlY2llczo1",
        name: "Hutt"
      }
    ]
  }
};

describe('FilmService', () => {
  let service: FilmService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilmService]
    });
    service = TestBed.inject(FilmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all films', () => {
    let response;
    spyOn(service, 'getFilms').and.returnValue(of(films));

    service.getFilms().subscribe(res => {
      response = res;
    });

    expect(response).toEqual(films);
  });

  it('should return information about film "A New Hope" with id "ZmlsbXM6MQ=="', () => {
    let response;
    spyOn(service, 'getFilm').and.returnValue(of(film));

    service.getFilm("ZmlsbXM6MQ==").subscribe(res => {
      response = res;
    });

    expect(response).toEqual(film);
  });
});
