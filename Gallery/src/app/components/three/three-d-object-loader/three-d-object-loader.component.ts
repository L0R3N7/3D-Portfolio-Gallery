import {Component, inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgtLoader, NgtObjectMap} from "@angular-three/core";
import {GLTF, GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {Observable} from "rxjs";
import {BlobService} from "../../../shared/blob.service";

@Component({
  selector: 'app-three-d-object-loader',
  templateUrl: './three-d-object-loader.component.html',
  styleUrls: ['./three-d-object-loader.component.scss'],
})

export class ThreeDObjectLoaderComponent implements OnInit, OnChanges{
  @Input('src') source?: string;
  @Input('blob') sourceBlob?: string;
  scale : number = 1;
  model$ : Observable<GLTF & NgtObjectMap> | undefined;
  first : boolean = true;

  constructor(private loader : NgtLoader, private blobService : BlobService) {}

  ngOnInit() {
    //this.source = "assets/three-d-objects/room/floor/1.gltf"
    this.load3dModel();
    this.load3dModelFromBlob();
  }

  ngOnChanges(changes:SimpleChanges){
    //@ts-ignore
    if ((this.source && changes.source && changes.source.currentValue != changes.source.previousValue) || (this.sourceBlob && changes.sourceBlob && changes.sourceBlob.currentValue != changes.sourceBlob.previousValue)) {
      if (this.first){
        this.first = false;
        return;
      }
      this.load3dModel();
      this.load3dModelFromBlob();
    }
  }

  load3dModel(){
    console.log(this.source);
    console.log(this.loader)
    if (this.source && this.loader) {
      // @ts-ignore
      this.model$ = this.loader.use(GLTFLoader, this.source);
      /*//@ts-ignore
      this.model$.subscribe((e) => {
        console.log(e.scene.children)
        //@ts-ignore
        this.scale = 2 / e.scene.children[0]?.geometry?.boundingSphere?.radius ?? 1;
      })*/
    }
  }

  load3dModelFromBlob(){
    if(this.sourceBlob && this.loader){
      var blob = this.blobService.cleanB64AndToBlob(this.sourceBlob);
      var url = URL.createObjectURL(blob);
      this.model$ = this.loader.use(GLTFLoader, url);
      console.log(this.model$);
    }
    /*if (this.sourceBlob && this.loader){
      console.log(this.sourceBlob)
      console.log(typeof  this.sourceBlob)

      //@ts-ignore
      var blob = this.blobService.b64ToBlob(this.sourceBlob, "octet/stream");
      console.log(typeof blob)
      var url = URL.createObjectURL(blob);
      console.log(url)
      this.model$ = this.loader.use(GLTFLoader, url);
    }*/
  }



}
