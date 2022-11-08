import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Position} from "../../../shared/class/position";
import {Room} from "../../../shared/class/room";
import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {FirstPersonControls} from "three/examples/jsm/controls/FirstPersonControls";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {TextureLoader} from "three";

@Component({
  selector: 'app-three-room-selection',
  templateUrl: './three-room-selection.component.html',
  styleUrls: ['./three-room-selection.component.scss']
})
export class ThreeRoomSelectionComponent implements AfterViewInit, OnChanges {
  @ViewChild('threeCanvas') threeCanvas!: ElementRef;
  @ViewChild('lookupSize') lookupSize !: ElementRef;

  @Input("srcModel") srcModel: String = "";
  @Input("srcTexture") srcTexture: String = "";


  scene = new THREE.Scene()
  loader = new GLTFLoader().setPath( 'assets/three-d-objects/room/' );
  textureLoader = new THREE.TextureLoader();

  camera ?: THREE.PerspectiveCamera;
  renderer ?: THREE.WebGLRenderer;
  controls ?: OrbitControls;

  constructor() {}

  ngAfterViewInit(): void {
    this.setup()
    this.loadRoom()
    this.animate()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadRoom();
  }

  loadRoom(){
    if (this.srcModel != ""){
      this.scene.clear();
      this.loader.load( 'walls/'+this.srcModel, (gltf: { scene: THREE.Object3D<THREE.Event>; }) => {
        this.scene.add( gltf.scene );

      });
      this.loader.load( 'floor/'+this.srcModel, (gltf: { scene: THREE.Object3D<THREE.Event>; }) => {
        this.scene.add( gltf.scene );
      });
    }
  }

  setup = () => {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.threeCanvas.nativeElement,
      antialias: true
    });
    this.camera = new THREE.PerspectiveCamera( 100, this.lookupSize.nativeElement.offsetWidth / this.lookupSize.nativeElement.offsetHeight, 0.1, 1000);
    this.onResize();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.scene.background = new THREE.Color( 0xf7f8fa )
    this.camera?.position.set( - 1.8, 100, 2.7 );
  }

  onResize(): void{
    if(this.camera){
      this.camera.aspect = this.lookupSize.nativeElement.offsetWidth / this.lookupSize.nativeElement.offsetHeight
    }
    if(this.renderer){
      this.renderer.setSize( this.lookupSize.nativeElement.offsetWidth, this.lookupSize.nativeElement.offsetHeight);
    }
  }


  animate = () => {
    requestAnimationFrame( this.animate );
    this.controls?.update();
    this.renderer?.render(this.scene, this.camera! );
  }
}
