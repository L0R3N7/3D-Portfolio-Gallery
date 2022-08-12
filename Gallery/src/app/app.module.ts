import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import {NgtCanvasModule} from "@angular-three/core";
import {NgtAmbientLightModule, NgtPointLightModule, NgtSpotLightModule} from "@angular-three/core/lights";
import {NgtMeshModule} from "@angular-three/core/meshes";
import {NgtBoxGeometryModule} from "@angular-three/core/geometries";
import {NgtMeshBasicMaterialModule} from "@angular-three/core/materials";
import {NgtSobaOrbitControlsModule} from "@angular-three/soba/controls";
import { HomePageComponent } from './site-components/home-page/home-page.component';
import { LogSigninPageComponent } from './site-components/log-signin-page/log-signin-page.component';
import { ProfilePageComponent } from './site-components/profile-page/profile-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import {MatIconModule} from "@angular/material/icon";
import { SlideshowComponent } from './components/slideshow/slideshow.component';
import { ExhibitionCardComponent } from './components/exhibition-card/exhibition-card.component';
import {MatCardModule} from "@angular/material/card";
import { SearchPageComponent } from './site-components/search-page/search-page.component';
import { CreateExhibitionPageComponent } from './site-components/create-exhibition-page/create-exhibition-page.component';
import { TagComponent } from './components/tag/tag.component';
import { InfoTagComponent } from './components/info-tag/info-tag.component';
import {MatStepperModule} from "@angular/material/stepper";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import { RoomCardComponent } from './components/room-card/room-card.component';


const routes: Routes = []

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LogSigninPageComponent,
    ProfilePageComponent,
    NavbarComponent,
    FooterComponent,
    SlideshowComponent,
    ExhibitionCardComponent,
    SearchPageComponent,
    CreateExhibitionPageComponent,
    TagComponent,
    InfoTagComponent,
    RoomCardComponent

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
    MatIconModule,
    MatCardModule,
    MatStepperModule,
    FormsModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
