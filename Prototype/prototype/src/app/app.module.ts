import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgtCanvasModule} from "@angular-three/core";
import {NgtAmbientLightModule, NgtPointLightModule} from "@angular-three/core/lights";
import { CubeComponent } from './components/cube/cube.component';
import {NgtMeshModule} from "@angular-three/core/meshes";
import {NgtBoxGeometryModule} from "@angular-three/core/geometries";
import {NgtMeshStandardMaterialModule} from "@angular-three/core/materials";
import {NgtSobaOrbitControlsModule} from "@angular-three/soba/controls";


@NgModule({
  declarations: [
    AppComponent,
    CubeComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
