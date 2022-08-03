import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Cube2Component} from "./cube2/cube2.component";

const routes: Routes = [
  {
    path: "",
    component: Cube2Component
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
