import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from '@agm/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { Accordion, AccordionGroup } from './pages/search-results/accordion';

import {ApiService} from './services/api.service';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'results', component: SearchResultsComponent },
  {
    path: 'profile', component: ProfileComponent
  },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchResultsComponent,
    ProfileComponent,
    Accordion,
    AccordionGroup
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCGkffnTSjs9i0PpPXthYJ93TBSJhJHEnQ",
      libraries: ["places"]
    }),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
