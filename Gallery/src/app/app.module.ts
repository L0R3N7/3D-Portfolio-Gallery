import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import {NgtCanvasModule, NgtComponentStore} from "@angular-three/core";
import {NgtAmbientLightModule, NgtPointLightModule, NgtSpotLightModule} from "@angular-three/core/lights";
import {NgtMeshModule} from "@angular-three/core/meshes";
import {NgtBoxGeometryModule} from "@angular-three/core/geometries";
import {NgtMeshBasicMaterialModule, NgtMeshStandardMaterialModule} from "@angular-three/core/materials";
import {
  NgtSobaFirstPersonControlsModule,
  NgtSobaFlyControlsModule,
  NgtSobaOrbitControlsModule
} from "@angular-three/soba/controls";
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
import { InfoTagComponent } from './components/info-tag/info-tag.component';
import {MatStepperModule} from "@angular/material/stepper";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import { SignupPageComponent } from './site-components/signup-page/signup-page.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import { MatSelectModule} from '@angular/material/select';

import {
  CreateExhibitionMetadataComponent
} from "./site-components/create-exhibition-page/create-exhibition-metadata/create-exhibition-metadata.component";
import {
  CreateExhibitionRoomselectionComponent
} from "./site-components/create-exhibition-page/create-exhibition-roomselection/create-exhibition-roomselection.component";
import {RoomCardComponent} from "./components/room-card/room-card.component";
import {SearchTagsComponent} from "./components/search-tags/search-tags.component";
import {FileUploadComponent} from "./components/file-upload/file-upload.component";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatChipsModule} from "@angular/material/chips";
import {HttpClientModule} from "@angular/common/http";
import { CreateExhibitionExhibitselectionComponent } from './site-components/create-exhibition-page/create-exhibition-exhibitselection/create-exhibition-exhibitselection.component';
import {MatListModule} from "@angular/material/list";
import { ExhibitCardComponent } from './components/exhibit-card/exhibit-card.component';
import { ExhibitonListComponent } from './components/exhibiton-list/exhibiton-list.component';
import { ThreeRoomComponent } from './components/three/three-room/three-room.component';
import { ThreeDObjectLoaderComponent } from './components/three/three-d-object-loader/three-d-object-loader.component';
import {NgtGroupModule} from "@angular-three/core/group";
import {NgtPrimitiveModule} from "@angular-three/core/primitive";
import { CreateExhibitionArrangeComponent } from './site-components/create-exhibition-page/create-exhibition-arrange/create-exhibition-arrange.component';
import { RoomPageComponent } from './site-components/room-page/room-page.component';
import {NgtOrthographicCameraModule, NgtPerspectiveCameraModule} from "@angular-three/core/cameras";
import {NgtSobaLoaderModule} from "@angular-three/soba/loaders";
import { ThreeRoomSelectionComponent } from './components/three/three-room-selection/three-room-selection.component';


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
    CreateExhibitionMetadataComponent,
    CreateExhibitionRoomselectionComponent,
    RoomCardComponent,
    SearchTagsComponent,
    FileUploadComponent,
    InfoTagComponent,
    SignupPageComponent,
    CreateExhibitionExhibitselectionComponent,
    ExhibitCardComponent,
    ExhibitonListComponent,
    ThreeRoomComponent,
    ThreeDObjectLoaderComponent,
    CreateExhibitionArrangeComponent,
    RoomPageComponent,
    ThreeRoomSelectionComponent
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
        MatFormFieldModule,
        DragDropModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatChipsModule,
        HttpClientModule,
        MatListModule,
        NgtGroupModule,
        NgtPrimitiveModule,
        NgtMeshStandardMaterialModule,
        MatSelectModule,
        NgtSobaFirstPersonControlsModule,
        NgtOrthographicCameraModule,
        NgtPerspectiveCameraModule,
        NgtSobaFlyControlsModule,
        NgtSobaLoaderModule,

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
