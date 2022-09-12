import {Component, inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgtLoader, NgtObjectMap} from "@angular-three/core";
import {GLTF, GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {Observable, toArray} from "rxjs";
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

  load3dModel() {
    console.log("####################################################### Load New Model")

    if (this.source && this.loader) {
      if (this.loader.cached.has(this.source)){
        this.loader.cached.delete(this.source);
        for (let value of this.toArray(this.loader.cached.entries())){
          //@ts-ignore
          value[1].subscribe((e)=>{
            console.log("###")
            console.log(value[0])
            console.log(e)
          });
        }

        this.model$ = this.loader.cached.get(this.source);

      }else{

        for (let value of this.toArray(this.loader.cached.entries())){
          //@ts-ignore
          value[1].subscribe((e)=>{
            console.log("###")
            console.log(value[0])
            console.log(e)
          });

        }
        this.model$ = this.loader.use(GLTFLoader, this.source);
      }

      /*this.model$?.subscribe((e)=> {
        console.log(e.scene);
      })*/

      //@ts-ignore
      /*this.model$.subscribe((e) => {
        //@ts-ignore
        //console.log(e.scene.children.geometry)
        //this.scale = 2 / e.scene.children[0]?.geometry?.boundingSphere?.radius ?? 1;
      })*/
    }
  }

  load3dModelFromBlob(){
    if(this.sourceBlob && this.loader){
      var blob = this.blobService.cleanB64AndToBlob(this.sourceBlob);
      var url = URL.createObjectURL(blob);
      this.model$ = this.loader.use(GLTFLoader, url);
    }
  }

  toArray<X>(xs: Iterable<X>): X[] {
    return [...xs]
  }



}
