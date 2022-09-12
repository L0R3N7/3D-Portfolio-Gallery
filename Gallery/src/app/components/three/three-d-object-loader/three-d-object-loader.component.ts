import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {make, NgtLoader, NgtObjectMap} from "@angular-three/core";
import {GLTF, GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {Observable, Subscription} from "rxjs";
import {BlobService} from "../../../shared/blob.service";
import {Color, MeshBasicMaterial, TextureLoader} from "three";
import {THREE} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-three-d-object-loader',
  templateUrl: './three-d-object-loader.component.html',
  styleUrls: ['./three-d-object-loader.component.scss'],
})

export class ThreeDObjectLoaderComponent implements OnInit, OnChanges{
  @Input('src') source?: string;
  @Input('blob') sourceBlob?: string;
  @Input('scale') scale : number = 2;
  model$ : Observable<GLTF & NgtObjectMap> | undefined;
  first : boolean = true;
  subscribtion :  Subscription | undefined;

  constructor(private loader : NgtLoader, private blobService : BlobService) {}

  ngOnInit() {
    this.subscribtion?.unsubscribe() ;
    this.load3dModel();
    this.load3dModelFromBlob();
    this.scale3dModel();
    this.useMaterialOn3DModule();
  }

  ngOnChanges(changes:SimpleChanges){
    //@ts-ignore
    if ((this.source && changes.source && changes.source.currentValue != changes.source.previousValue) || (this.sourceBlob && changes.sourceBlob && changes.sourceBlob.currentValue != changes.sourceBlob.previousValue)) {
      if (this.first){
        this.first = false;
        return;
      }
      this.subscribtion?.unsubscribe() ;
      this.load3dModel();
      this.load3dModelFromBlob();
      this.scale3dModel();
      this.useMaterialOn3DModule();
    }
  }

  load3dModel() {
    if (this.source && this.loader) {
      if (this.loader.cached.has(this.source)){this.loader.cached.delete(this.source)}
      this.model$ = this.loader.use(GLTFLoader, this.source);
    }
  }

  load3dModelFromBlob(){
    if(this.sourceBlob && this.loader){
      var blob = this.blobService.cleanB64AndToBlob(this.sourceBlob);
      var url = URL.createObjectURL(blob);
      this.model$ = this.loader.use(GLTFLoader, url);
    }
  }

  scale3dModel(){
    this.subscribtion = this.model$?.subscribe((e)=>{
      var res : number = 0;
      const all = e.scene.children.filter((obj) => {
        // @ts-ignore
        return obj.geometry.type == 'BufferGeometry'
      });
      all.forEach((al)=>{ // @ts-ignore
        res += al.geometry.boundingSphere.radius ?? 0})
      res /= all.length;
      this.scale = (1 / res) * 1;
    })
  }

  useMaterialOn3DModule(){
    var mesh : MeshBasicMaterial;
    this.loader.use(TextureLoader, 'assets/image/placeholder-card.jpg').subscribe((e) => {
      mesh = new MeshBasicMaterial({map: e})
      mesh.color = make(Color, [1, 0, 0 ]);
    });
    this.subscribtion = this.model$?.subscribe((em)=> {
      console.log(em);
      em.materials = {"" : mesh};
    })

  }
}
