import {Component, Input, OnInit} from '@angular/core';
import {NgtCanvas, NgtLoader} from "@angular-three/core";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

@Component({
  selector: 'app-three-d-object-loader',
  templateUrl: './three-d-object-loader.component.html',
  styleUrls: ['./three-d-object-loader.component.scss'],

})

export class ThreeDObjectLoaderComponent implements OnInit {
  @Input('src') source?: string;
  model$ = this.loader.use(GLTFLoader, '/assets/three-d-objects/podest_01.gltf')

  constructor(private loader: NgtLoader) {

  }

  ngOnInit(): void {
    console.log(this.model$)
    this.model$.subscribe((e)=>{
      console.log(e.scene)
    })
  }
}

