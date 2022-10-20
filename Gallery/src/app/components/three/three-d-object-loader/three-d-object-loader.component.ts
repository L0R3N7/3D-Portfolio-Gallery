import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgtLoader, NgtObjectMap} from "@angular-three/core";
import {GLTF, GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {Observable, Subscription} from "rxjs";
import {BlobService} from "../../../shared/blob.service";
import {BufferGeometry, Group, Loader, Mesh, MeshBasicMaterial, Object3D, Texture, TextureLoader} from "three";
import {FileUploadOutput} from "../../../shared/file-upload-output";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";
import {AMFLoader} from "three/examples/jsm/loaders/AMFLoader";

@Component({
  selector: 'app-three-d-object-loader'     ,
  templateUrl: './three-d-object-loader.component.html',
  styleUrls: ['./three-d-object-loader.component.scss'],
})

export class ThreeDObjectLoaderComponent implements OnInit, OnChanges{
  @Input('srcModel') modelUrl?: string;
  @Input('blobModel') modelBlob?: FileUploadOutput;
  @Input('srcTexture') textureUrl ?: string //= 'assets/image/placeholder-card.jpg';
  @Input('scale') scale : number = 1;
  model$ : Observable<GLTF & NgtObjectMap> | undefined;
  texture : Texture | undefined;
  loaderType : Map<string, Loader> | undefined;

  constructor(private loader : NgtLoader, private blobService : BlobService) {}

  ngOnInit() {
    // TODO Test 3D Loaders
    // @ts-ignore
    this.loaderType = new Map<string, Loader>([
      ['gltf', GLTFLoader],
      ['obj', OBJLoader],
      ['fbx', FBXLoader],
      ['amf', AMFLoader]
    ]);
  }

  ngOnChanges(changes:SimpleChanges){

    let keys = Object.keys(changes);

    if (Object.keys(changes).includes("scale")){
      this.scale = changes["scale"].currentValue;
    }

    // load texture if provided
    if (this.textureUrl) {
      this.loadTexture()
    }

    // load 3D Data - per local url or per blob
    if (this.modelUrl || this.modelBlob && keys.includes("modelUrl") || keys.includes("modelBlob")){
      this.load3dModel();
    }
    // configs the 3D Model
    if (this.scale){
      this.config3dModel();
    }
  }

  load3dModel() {
    if (this.modelUrl && this.loader) {
      if (this.loader.cached.has(this.modelUrl)){this.loader.cached.delete(this.modelUrl)}
      this.model$ = this.loader.use(GLTFLoader, this.modelUrl);
    } else if(this.modelBlob && this.loader){
      var url = URL.createObjectURL(this.modelBlob.blob);
      var loader;
      if (this.loaderType?.get(this.modelBlob.filetype)){
        loader = this.loaderType?.get(this.modelBlob.filetype);
      }else{
        loader = GLTFLoader;
      }
      // @ts-ignore
      this.model$ = this.loader.use(loader, url);
    }
  }

  config3dModel(){
    this.model$?.subscribe((e : GLTF)=>{
      // calculates the size of an object and adjusts the scale accordingly
      // TODO Fix Scaling Method
      this.scale *= 1 / this.scale3dModel(e.scene.children)
      console.log(this.scale)
      // if texture is provided uses it on the loaded 3d model
      if (this.texture){
        var material = new MeshBasicMaterial({map: this.texture});
        this.recursiveChildsMaterial(e.scene.children, material);
      }
    });
  }

  scale3dModel(arr_mesh : Object3D[], stepps: number = 5) : number{
    let radius = 0;
    // @ts-ignore
    arr_mesh.forEach((mesh: Object3D) => {
      //@ts-ignore
      radius += mesh.geometry.boundingSphere.radius;
      if (mesh.children.length != 0 && stepps > 0) {
        return this.scale3dModel(mesh.children, stepps - 1) + radius;
      }
    })
    return radius;
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
