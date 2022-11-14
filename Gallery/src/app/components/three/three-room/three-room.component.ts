import {
  Component,
  Input,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Room } from 'src/app/shared/class/room';
import { Position } from 'src/app/shared/class/position';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {BoxGeometry, Vector2, Vector3} from "three";
import {PositionConfig} from "../../../shared/class/positionConfig";
import {
  ExhibitArrangeService
} from "../../../site-components/create-exhibition-page/create-exhibition-arrange/exhibit-arrange.service";
import {generateTypeCheckBlock} from "@angular/compiler-cli/src/ngtsc/typecheck/src/type_check_block";

@Component({
  selector: 'app-three-room',
  templateUrl: './three-room.component.html',
  styleUrls: ['./three-room.component.scss']
})
export class ThreeRoomComponent implements AfterViewInit, OnDestroy, OnChanges{


  position_arr : Position[] = [new Position(1, 2, 0, 0, false),
    new Position(2, 2, 1, 1, false),
    new Position(3, 2, 1, 0, false)]
  @Input('room') room : Room = new Room(2,  "small room", 0, "https://www.smb.museum/uploads/tx_smb/news/news_67970/Neues-Museum_Raum-Prolog_Achim_Kleuker_xl.jpg", "2.gltf", this.position_arr)
  @Input('mode') mode : String = "create";
  @Input('positionConfigList') positionConfigList ?: PositionConfig[];

  @ViewChild('threeCanvas') threeCanvas!: ElementRef;
  @ViewChild('lookupSize') lookupSize !: ElementRef;

  scene = new THREE.Scene()
  clock = new THREE.Clock()
  loader = new GLTFLoader().setPath( 'assets/three-d-objects/' );

  camera ?: THREE.PerspectiveCamera;
  renderer ?: THREE.WebGLRenderer;
  controls ?: FirstPersonControls | OrbitControls;

  potests = new BoxGeometry(20, 80, 20);
  basic_material = new THREE.MeshBasicMaterial({color: 0x00ee00, opacity: .5})
  isAboutToDestroy = false;

  constructor(private exhibitArrangeService : ExhibitArrangeService) {
    //Places Exhibition, if they have an according potest position
    exhibitArrangeService.getPositionConfigList().subscribe(
      values => {
        for (let value of values){
          //removes pre-existing exhibits
          if(!value.position_id){
            continue;
          }
          if (value.uuid){
            const object = this.scene.getObjectByProperty('uuid', value.uuid);
            if (object){
              this.scene.remove( object );
              object.clear()
            }
          }
          //load 3D Exhibit
          this.loader.load(value.exhibit_url, (gltf: { scene: THREE.Object3D<THREE.Event>; }) => {
            value.uuid = gltf.scene.uuid;
            console.log(this.room.positions[value.position_id -1].y * 100)
            gltf.scene.position.set(this.room.positions[value.position_id -1].x * 200, 200, this.room.positions[value.position_id -1].y * 200)
            gltf.scene.scale.set(.5, .5, .5)
            //gltf.scene
            this.scene.add( gltf.scene );
            console.log("loaded cheese")
            console.log(this.getSize(gltf.scene))
            console.log(gltf.scene.getWorldScale(new Vector3()))
            console.log(gltf.scene.getWorldPosition(new Vector3()))
          });
        }
      }
    )
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }

  ngAfterViewInit(): void {
    if (!this.room){
      return
    }

    this.setup()
    //Light
    const bulbGeometry = new THREE.SphereGeometry(.02, 16, 8);
    const bulbLight = new THREE.PointLight( 0xffee88, 3, 1000, 2);
    const bulbMat = new THREE.MeshStandardMaterial( {
      emissive: 0xffffee,
      emissiveIntensity: 1,
      color: 0x000000
    } );
    bulbLight.add( new THREE.Mesh( bulbGeometry, bulbMat ) );
    bulbLight.position.set( 0, 100, 0 );
    bulbLight.castShadow = true;
    this.scene.add( bulbLight );

    //Load Room
    this.loader.load( `room/walls/${this.room.id}.gltf`, (gltf: { scene: THREE.Object3D<THREE.Event>; }) => {
      this.scene.add( gltf.scene );
    });
    this.loader.load( `room/floor/${this.room.id}.gltf`, (gltf: { scene: THREE.Object3D<THREE.Event>; }) => {
      this.scene.add( gltf.scene );
    });

    //Sockels
    let faktor = 100;
    for (let i = 0; i < this.room.positions.length; i++){
      let cube = new THREE.Mesh(this.potests, this.basic_material);
      cube.position.set(this.room.positions[i].x * faktor, 0, this.room.positions[i].y * faktor);
      this.scene.add(cube);
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
      this.camera?.position.set( - 1.8, 100, 10 );
    }else{
      this.controls = new FirstPersonControls(this.camera, this.renderer.domElement)
      this.controls!.lookSpeed = 0.2;
      this.controls!.movementSpeed = 100;
      this.controls!.lookVertical = false;
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
    if (!this.isAboutToDestroy){
      requestAnimationFrame( this.animate );
    }
    this.controls?.update(this.clock.getDelta())
    this.renderer?.render(this.scene, this.camera! );
    console.log("Animate")
  }

  ngOnDestroy() {
    this.isAboutToDestroy = true
    this.scene.clear()
  }

  getSize(scene : THREE.Object3D){
    return new THREE.Box3().setFromObject(scene).getSize(new THREE.Vector3())
  }
}
