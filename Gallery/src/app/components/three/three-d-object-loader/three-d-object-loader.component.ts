import {Component, inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgtLoader, NgtObjectMap} from "@angular-three/core";
import {GLTF, GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {Observable} from "rxjs";

@Component({
  selector: 'app-three-d-object-loader',
  templateUrl: './three-d-object-loader.component.html',
  styleUrls: ['./three-d-object-loader.component.scss'],
})

export class ThreeDObjectLoaderComponent implements OnInit, OnChanges{
  @Input('src') source?: string;
  scale : number = 1;
  model$ : Observable<GLTF & NgtObjectMap> | undefined;
  first : boolean = true;

  constructor(private loader : NgtLoader) {}

  ngOnInit() {
    //this.source = "assets/three-d-objects/room/floor/1.gltf"
    this.load3dModel();
  }

  ngOnChanges(changes:SimpleChanges){
    //@ts-ignore
    if (this.source && changes.source && changes.source.currentValue != changes.source.previousValue) {
      if (this.first){
        this.first = false;
        return;
      }
      this.load3dModel();
    }
  }

  load3dModel(){
    console.log(this.source);
    console.log(this.loader)
    if (this.source && this.loader) {
      // @ts-ignore
      this.model$ = this.loader.use(GLTFLoader, this.source);
      //@ts-ignore
      this.model$.subscribe((e) => {
        console.log(e.scene.children)
        //@ts-ignore
        this.scale = 2 / e.scene.children[0]?.geometry?.boundingSphere?.radius ?? 1;
      })
    }
  }
}
