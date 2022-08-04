import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomePageComponent} from "./site-components/home-page/home-page.component";
import {LogSigninPageComponent} from "./site-components/log-signin-page/log-signin-page.component";

const routes: Routes = [
  {path: 'home', component:HomePageComponent},
  {path: 'log-signin', component:LogSigninPageComponent}

]; // sets up routes constant where routes are defined

// configures NgModule imports and exports
@NgModule({
  declarations: [],
  imports: [ CommonModule, RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
