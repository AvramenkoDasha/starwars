import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Apollo} from 'apollo-angular';
import {gql} from '@apollo/client/core';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StarshipService {

  constructor(private apollo: Apollo) { }

  getStarships(): Observable<any> {
    return this.apollo
      .watchQuery<any>({
        query: gql`
                    query getStarships {
                        allStarships {
                          starships {
                            id
                            name
                            model
                            starshipClass
                            maxAtmospheringSpeed
                          }
                        }
                      }
        `
      })
      .valueChanges.pipe(map(result => result.data.allStarships.starships));
  }

  getStarshipsForTeams(): Observable<any> {
    return this.apollo
      .watchQuery<any>({
        query: gql`
                    query getStarships {
                        allStarships {
                          starships {
                            name
                          }
                        }
                      }
        `
      })
      .valueChanges.pipe(map(result => result.data.allStarships.starships));
  }


  getStarship(id: any): Observable<any> {
    return this.apollo
      .watchQuery<any>({
        query: gql`
                    query getStarship {
                        starship (id: "${id}") {
                          id
                          name
                          model
                          starshipClass
                          costInCredits
                          length
                          crew
                          passengers
                          maxAtmospheringSpeed
                          pilotConnection {
                            pilots {
                              id
                              name
                            }
                          }
                          filmConnection {
                            films {
                              id
                              title
                            }
                          }
                        }
                      }
        `
      })
      .valueChanges.pipe(map(result => result.data.starship));
  }
}
