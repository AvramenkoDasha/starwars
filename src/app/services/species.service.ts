import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Apollo} from 'apollo-angular';
import {gql} from '@apollo/client/core';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {

  constructor(private apollo: Apollo) { }

  getSpecies(): Observable<any> {
    return this.apollo
      .watchQuery<any>({
        query: gql`
                    query getSpecies {
                        allSpecies {
                          species {
                            id
                            name
                            averageHeight
                            averageLifespan
                            language
                          }
                        }
                      }
        `
      })
      .valueChanges.pipe(map(result => result.data.allSpecies.species));
  }

  getKind(id: any): Observable<any> {
    return this.apollo
      .watchQuery<any>({
        query: gql`
                    query getSpecies {
                      species (id: "${id}") {
                        id
                        name
                        averageHeight
                        averageLifespan
                        eyeColors
                        hairColors
                        skinColors
                        language
                        personConnection {
                          people {
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
      .valueChanges.pipe(map(result => result.data.species));
  }
}
