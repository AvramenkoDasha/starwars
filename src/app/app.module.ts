import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilmsComponent } from './films/films.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { SearchComponent } from './search/search.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PeopleComponent } from './people/people.component';
import { StarshipsComponent } from './starships/starships.component';
import { PlanetsComponent } from './planets/planets.component';
import { SpeciesComponent } from './species/species.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FilmCardComponent } from './films/film-card/film-card.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PersonCardComponent } from './people/person-card/person-card.component';
import { StarshipCardComponent } from './starships/starship-card/starship-card.component';
import { PlanetCardComponent } from './planets/planet-card/planet-card.component';
import { SpeciesCardComponent } from './species/species-card/species-card.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    FilmsComponent,
    SearchComponent,
    PeopleComponent,
    StarshipsComponent,
    PlanetsComponent,
    SpeciesComponent,
    NavbarComponent,
    FilmCardComponent,
    PersonCardComponent,
    StarshipCardComponent,
    PlanetCardComponent,
    SpeciesCardComponent,
    StarRatingComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    GraphQLModule,
    HttpClientModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
