import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Room } from 'src/app/shared/class/room';
import { Position } from 'src/app/shared/class/position';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';

@Component({
  selector: 'app-three-room',
  templateUrl: './three-room.component.html',
  styleUrls: ['./three-room.component.scss']
})
export class ThreeRoomComponent implements AfterViewInit {

  position_arr : Position[] = [new Position(0, 0, 0, 0, false)]
  @Input('room') room : Room = new Room(0,  "small room", 0, "https://www.smb.museum/uploads/tx_smb/news/news_67970/Neues-Museum_Raum-Prolog_Achim_Kleuker_xl.jpg", "2.gltf", this.position_arr)

  @ViewChild('threeCanvas') threeCanvas!: ElementRef;
  @ViewChild('lookupSize') lookupSize !: ElementRef; 
  

  scene = new THREE.Scene()
  clock = new THREE.Clock()
  loader = new GLTFLoader().setPath( 'assets/three-d-objects/room/' );

  camera ?: THREE.PerspectiveCamera; 
  renderer ?: THREE.WebGLRenderer; 
  controls ?: FirstPersonControls;


  constructor() {}

  setup = () => {
    this.camera = new THREE.PerspectiveCamera( 100, this.lookupSize.nativeElement.offsetWidth / this.lookupSize.nativeElement.offsetHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.threeCanvas.nativeElement
    });
    this.controls = new FirstPersonControls(this.camera, this.renderer.domElement)
    this.renderer?.setSize( this.lookupSize.nativeElement.offsetWidth, this.lookupSize.nativeElement.offsetHeight );
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
  
  

  ngAfterViewInit(): void {
    this.setup()


    this.scene.background = new THREE.Color( 0xf7f8fa )
    this.camera?.position.set( - 1.8, 100, 2.7 );
    
    
  
    //this.threeCanvas.nativeElement.appendChild(renderer.domElement);


    this.loader.load( 'walls/2.gltf', (gltf: { scene: THREE.Object3D<THREE.Event>; }) => {
      this.scene.add( gltf.scene );
    });

    this.controls!.lookSpeed = 0.0;
    this.controls!.movementSpeed = 100;
    this.animate(); 
  }
}
