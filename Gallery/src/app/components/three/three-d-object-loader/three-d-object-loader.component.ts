import {Component, Input, OnInit} from '@angular/core';
import {NgtLoader, NgtObjectMap} from "@angular-three/core";
import {GLTF, GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {Observable} from "rxjs";

@Component({
  selector: 'app-three-d-object-loader',
  templateUrl: './three-d-object-loader.component.html',
  styleUrls: ['./three-d-object-loader.component.scss'],

})

export class ThreeDObjectLoaderComponent implements OnInit {
  @Input('src') source?: string;
  model$ : Observable<GLTF & NgtObjectMap> | undefined
  scale : number = 1;

  constructor(private loader: NgtLoader) {

  }

  ngOnInit(): void {
    console.log(this.source)
    if (this.source){
      this.model$ = this.loader.use(GLTFLoader, this.source);;
      //@ts-ignore
      this.model$.subscribe((e)=>{
        //@ts-ignore
        this.scale = 2 / e.scene.children[0].geometry.boundingSphere.radius;
      })
    }
  }
}

