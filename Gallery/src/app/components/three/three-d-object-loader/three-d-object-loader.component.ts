import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgtLoader, NgtObjectMap} from "@angular-three/core";
import {GLTF, GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {Observable, Subscription} from "rxjs";
import {BlobService} from "../../../shared/blob.service";
import {Loader, Mesh, MeshBasicMaterial, Object3D, Texture, TextureLoader} from "three";
import {FileUploadOutput} from "../../../shared/file-upload-output";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";
import {AMFLoader} from "three/examples/jsm/loaders/AMFLoader";

@Component({
  selector: 'app-three-d-object-loader',
  templateUrl: './three-d-object-loader.component.html',
  styleUrls: ['./three-d-object-loader.component.scss'],
})

export class ThreeDObjectLoaderComponent implements OnInit, OnChanges{
  @Input('srcModel') modelUrl?: string;
  @Input('blobModel') modelBlob?: FileUploadOutput;
  @Input('srcTexture') textureUrl ?: string = 'assets/image/placeholder-card.jpg';
  @Input('scale') scale : number = 2;
  model$ : Observable<GLTF & NgtObjectMap> | undefined;
  subscribtion :  Subscription | undefined;
  texture : Texture | undefined;
  loaderType : [] | undefined;

  constructor(private loader : NgtLoader, private blobService : BlobService) {}

  ngOnInit() {
    // @ts-ignore
    //this.loaderType = ['gltf' : GLTFLoader, 'obj' : OBJLoader, 'fbx' : FBXLoader, 'amf' : AMFLoader];
  }

  ngOnChanges(changes:SimpleChanges){
    //resets model observer
    this.subscribtion?.unsubscribe() ;

    // load texture if provided
    if (this.textureUrl) {
      this.loadTexture()
    }

    // load 3D Data - per local url or per blob
    this.load3dModel();
    // configs the 3D Model
    this.config3dModel();
  }

  load3dModel() {


    if (this.modelUrl && this.loader) {
      if (this.loader.cached.has(this.modelUrl)){this.loader.cached.delete(this.modelUrl)}
      this.model$ = this.loader.use(GLTFLoader, this.modelUrl);
    }else if(this.modelBlob && this.loader){
      var loaderType = GLTFLoader;

      var url = URL.createObjectURL(this.modelBlob.blob);
      this.model$ = this.loader.use(loaderType, url);
    }
  }

  config3dModel(){
    this.subscribtion = this.model$?.subscribe((e)=>{
      // calculates the size of an object and adjusts the scale accordingly
      this.scale3dModel(e.scene.children);
      // if texture is provided uses it on the loaded 3d model
      if (this.texture){
        var material = new MeshBasicMaterial({map: this.texture});
        this.recursiveChildsMaterial(e.scene.children, material);
      }
    });
  }

  scale3dModel(arr_mesh:  Mesh[] | Object3D[]){
      var res : number = 0;
      // @ts-ignore
      const all = arr_mesh.filter((obj) => {
        // @ts-ignore
        return obj.geometry.type == 'BufferGeometry'
      });
      // @ts-ignore
      all.forEach((al)=>{res += al.geometry.boundingSphere.radius ?? 0});
      res /= all.length;
      this.scale = (1 / res) * 1;
  }


  loadTexture() {
    this.loader.use(TextureLoader, 'assets/image/placeholder-card.jpg').subscribe((e) => {
      this.texture = e;
    });
  }

  recursiveChildsMaterial(arr_mesh: Object3D[] | Mesh[], material: MeshBasicMaterial, stepps : number = 5){
    arr_mesh.forEach((mesh) => {
      //@ts-ignore
      mesh.material = material
      if (mesh.children.length != 0 && mesh.children && stepps > 0){
        this.recursiveChildsMaterial(mesh.children, material, stepps - 1)
      }
      return;
    })
  }
}
