import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Apollo} from 'apollo-angular';
import {gql} from '@apollo/client/core';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  constructor(private apollo: Apollo) { }

  getFilms(): Observable<any> {
    return this.apollo
      .watchQuery<any>({
        query: gql`
                    query getFilms {
                        allFilms {
                          films {
                            id
                            title
                            openingCrawl
                            releaseDate
                          }
                        }
                      }
        `
      })
      .valueChanges.pipe(map(result => result.data.allFilms.films));
  }

  getFilm(id: any): Observable<any> {
    return this.apollo
      .watchQuery<any>({
        query: gql`
                    query getFilm {
                      film (id: "${id}") {
                        id
                        title
                        director
                        producers
                        releaseDate
                        characterConnection {
                          characters {
                            id
                            name
                          }
                        }
                        starshipConnection {
                          starships {
                            id
                            name
                          }
                        }
                        planetConnection {
                          planets {
                            id
                            name
                          }
                        }
                        speciesConnection {
                          species {
                            id
                            name
                          }
                        }
                      }
                    }
        `
      })
      .valueChanges.pipe(map(result => result.data.film));
  }
}
