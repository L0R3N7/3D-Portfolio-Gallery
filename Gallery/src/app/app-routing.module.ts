import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomePageComponent} from "./site-components/home-page/home-page.component";
import {LogSigninPageComponent} from "./site-components/auth/log-signin-page/log-signin-page.component";
import {SearchPageComponent} from "./site-components/search-page/search-page.component";
import {ProfilePageComponent} from "./site-components/profile-page/profile-page.component";
import {CreateExhibitionPageComponent} from "./site-components/create-exhibition-page/create-exhibition-page.component";
import {SignupPageComponent} from "./site-components/auth/signup-page/signup-page.component";
import {RoomPageComponent} from "./site-components/room-page/room-page.component";

const routes: Routes = [
  {path: '', component:HomePageComponent},
  {path: 'home', component:HomePageComponent},
  {path: 'log-signin', component:LogSigninPageComponent},
  {path: 'search', component:SearchPageComponent},
  {path: 'profile', component:ProfilePageComponent},
  {path: 'create', component:CreateExhibitionPageComponent},
  {path: 'signup', component:SignupPageComponent},
  {path: 'room/:id', component:RoomPageComponent},
  {path: '**', redirectTo: 'home'}


]; // sets up routes constant where routes are defined
//
// // configures NgModule imports and exports
@NgModule({
  declarations: [],
  imports: [ CommonModule, RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
