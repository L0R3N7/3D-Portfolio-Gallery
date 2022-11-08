import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Room } from 'src/app/shared/class/room';
import { Position } from 'src/app/shared/class/position';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import {BoxGeometry} from "three";

@Component({
  selector: 'app-three-room',
  templateUrl: './three-room.component.html',
  styleUrls: ['./three-room.component.scss']
})
export class ThreeRoomComponent implements AfterViewInit {


  position_arr : Position[] = [new Position(1, 2, 0, 0, false),
    new Position(2, 2, 1, 1, false),
    new Position(3, 2, 1, 0, false)]
  @Input('room') room : Room = new Room(2,  "small room", 0, "https://www.smb.museum/uploads/tx_smb/news/news_67970/Neues-Museum_Raum-Prolog_Achim_Kleuker_xl.jpg", "2.gltf", this.position_arr)
  @Input('mode') mode : String = "create";

  @ViewChild('threeCanvas') threeCanvas!: ElementRef;
  @ViewChild('lookupSize') lookupSize !: ElementRef;

  scene = new THREE.Scene()
  clock = new THREE.Clock()
  loader = new GLTFLoader().setPath( 'assets/three-d-objects/room/' );

  camera ?: THREE.PerspectiveCamera;
  renderer ?: THREE.WebGLRenderer;
  controls ?: FirstPersonControls | OrbitControls;

  potests ?: BoxGeometry[];

  constructor() {
  }

  ngAfterViewInit(): void {
    this.setup()
    //Load Room
    this.loader.load( `walls/${this.room.id}.gltf`, (gltf: { scene: THREE.Object3D<THREE.Event>; }) => {
      this.scene.add( gltf.scene );
    });
    //Load Sockels
    for (let i = 0; i < this.room.positions.length; i++){
      
    }
    this.animate();
  }

  setup = () => {
    this.camera = new THREE.PerspectiveCamera( 100, this.lookupSize.nativeElement.offsetWidth / this.lookupSize.nativeElement.offsetHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.threeCanvas.nativeElement
    });
    this.renderer?.setSize( this.lookupSize.nativeElement.offsetWidth, this.lookupSize.nativeElement.offsetHeight );
    this.scene.background = new THREE.Color( 0xf7f8fa )
    this.camera?.position.set( - 1.8, 100, 2.7 );

    if (this.mode == "create"){
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    }else{
      this.controls = new FirstPersonControls(this.camera, this.renderer.domElement)
      this.controls!.lookSpeed = 0.0;
      this.controls!.movementSpeed = 100;
    }
  }

  onResize($event: Event): void{
    if(this.camera){
      this.camera.aspect = this.lookupSize.nativeElement.offsetWidth / this.lookupSize.nativeElement.offsetHeight
      console.log( this.camera.aspect)
      console.log( this.lookupSize.nativeElement.offsetWidth / this.lookupSize.nativeElement.offsetHeight)
    }
    if(this.renderer){
      this.renderer?.setSize( this.lookupSize.nativeElement.offsetWidth, this.lookupSize.nativeElement.offsetHeight);
    }
  }

  animate = () => {
    requestAnimationFrame( this.animate );
    this.controls?.update(this.clock.getDelta())
    this.renderer?.render(this.scene, this.camera! );
  }
}
