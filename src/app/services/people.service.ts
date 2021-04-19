import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Apollo} from 'apollo-angular';
import {gql} from '@apollo/client/core';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private apollo: Apollo) { }

  getPeople(): Observable<any> {
    return this.apollo
      .watchQuery<any>({
        query: gql`
                    query getPeople {
                      allPeople {
                        people {
                          id
                          name
                          birthYear
                          eyeColor
                          hairColor
                          skinColor
                        }
                      }
                    }
        `
      })
      .valueChanges.pipe(map(result => result.data.allPeople.people));
  }

  getPerson(id: any): Observable<any> {
    return this.apollo
      .watchQuery<any>({
        query: gql`
                    query getPerson {
                      person (id: "${id}") {
                        id
                        name
                        birthYear
                        eyeColor
                        gender
                        hairColor
                        height
                        mass
                        skinColor
                        filmConnection {
                          films {
                            id
                            title
                          }
                        }
                        starshipConnection {
                          starships {
                            id
                            name
                          }
                        }
                      }
                    }
        `
      })
      .valueChanges.pipe(map(result => result.data.person));
  }
}
