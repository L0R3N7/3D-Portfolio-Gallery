import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Cube2Component} from "./cube2/cube2.component";
import {ControlsComponent} from "./controls/controls.component";

const routes: Routes = [
  {
    path: "",
    component: ControlsComponent
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
