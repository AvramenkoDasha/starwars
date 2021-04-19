import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Apollo} from 'apollo-angular';
import {gql} from '@apollo/client/core';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  constructor(private apollo: Apollo) { }

  getPlanets(): Observable<any> {
    return this.apollo
      .watchQuery<any>({
        query: gql`
                    query getPlanets {
                        allPlanets {
                          planets {
                            id
                            name
                            population
                            climates
                            terrains
                          }
                        }
                      }
        `
      })
      .valueChanges.pipe(map(result => result.data.allPlanets.planets));
  }

  getPlanet(id: any): Observable<any> {
    return this.apollo
      .watchQuery<any>({
        query: gql`
                    query getPlanet {
                      planet (id: "${id}") {
                        id
                        name
                        diameter
                        gravity
                        population
                        climates
                        terrains
                        surfaceWater
                        residentConnection {
                          residents {
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
      .valueChanges.pipe(map(result => result.data.planet));
  }
}
