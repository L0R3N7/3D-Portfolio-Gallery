import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component'
import {NgtCanvasModule} from "@angular-three/core";
import {NgtAmbientLightModule, NgtPointLightModule, NgtSpotLightModule} from "@angular-three/core/lights";
import {NgtMeshModule} from "@angular-three/core/meshes";
import {NgtBoxGeometryModule} from "@angular-three/core/geometries";
import {NgtMeshBasicMaterialModule} from "@angular-three/core/materials";
import {NgtSobaOrbitControlsModule} from "@angular-three/soba/controls";
import { CTComponent } from './components/c-t/c-t.component';

const routes: Routes = []

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    CTComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    NgtCanvasModule,
    NgtAmbientLightModule,
    NgtSpotLightModule,
    NgtPointLightModule,
    NgtMeshModule,
    NgtBoxGeometryModule,
    NgtMeshBasicMaterialModule,
    NgtSobaOrbitControlsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
