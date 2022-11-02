import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgtCanvasModule} from "@angular-three/core";
import {NgtAmbientLightModule, NgtPointLightModule} from "@angular-three/core/lights";

import {NgtMeshModule} from "@angular-three/core/meshes";
import {NgtBoxGeometryModule} from "@angular-three/core/geometries";
import {NgtMeshBasicMaterialModule, NgtMeshStandardMaterialModule} from "@angular-three/core/materials";
import {NgtSobaFirstPersonControlsModule, NgtSobaOrbitControlsModule} from "@angular-three/soba/controls";

import { Cube2Component } from './cube2/cube2.component';
import {NgtColorAttributeModule} from "@angular-three/core/attributes";
import {NgtSobaLoaderModule} from "@angular-three/soba/loaders";
import { ControlsComponent } from './controls/controls.component';


@NgModule({
  declarations: [
    AppComponent,
    Cube2Component,
    ControlsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgtCanvasModule,
    NgtAmbientLightModule,
    NgtMeshModule,
    NgtBoxGeometryModule,
    NgtMeshStandardMaterialModule,
    NgtSobaOrbitControlsModule,
    NgtPointLightModule,
    NgtSobaFirstPersonControlsModule,
    NgtMeshBasicMaterialModule,
    NgtColorAttributeModule,
    NgtSobaLoaderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
