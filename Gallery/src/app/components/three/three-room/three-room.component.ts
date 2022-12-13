import {
  Component,
  Input,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  OnChanges,
  SimpleChanges, Inject
} from '@angular/core';
import { Room } from 'src/app/shared/class/room';
import { Position } from 'src/app/shared/class/position';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {BoxGeometry, Camera, Vector3} from "three";
import {PositionConfig} from "../../../shared/class/positionConfig";
import {
  ExhibitArrangeService
} from "../../../site-components/create-exhibition-page/create-exhibition-arrange/exhibit-arrange.service";
import {generateTypeCheckBlock} from "@angular/compiler-cli/src/ngtsc/typecheck/src/type_check_block";
import {render} from "@angular-three/core";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

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

  @ViewChild('threeCanvas') threeCanvas!: ElementRef;
  @ViewChild('lookupSize') lookupSize !: ElementRef;

  scene = new THREE.Scene()
  clock = new THREE.Clock()
  loader = new GLTFLoader().setPath( 'assets/three-d-objects/' );

  raycaster = new THREE.Raycaster()
  pointer = new THREE.Vector2()

  camera ?: THREE.PerspectiveCamera;
  renderer ?: THREE.WebGLRenderer;
  controls ?: FirstPersonControls | OrbitControls;

  potests = new BoxGeometry(20, 45, 20);
  basic_material = new THREE.MeshBasicMaterial({color: 0x00ee00, opacity: .5})
  isAboutToDestroy = false;
  factor = 100

  dialogOpen = false;
  animationid?: number
  objectDescription?: String
  objectTitle?: String


  constructor(private exhibitArrangeService : ExhibitArrangeService, public dialog: MatDialog) {
    // Load exhibit based on the positionConfigList
    exhibitArrangeService.getPositionConfigList().subscribe(
      values => {
        for (let value of values){
          // If there was an preexisting object delete it
          if (value.uuid){
            const object = this.scene.getObjectByProperty('uuid', value.uuid);
            if (object){
              this.scene.remove( object );
              object.clear()
            }
          }
          // If there is no possition don't draw the object
          if(!value.position_id){
            continue;
          }
          // load and configure exhibit object
          this.loader.load(value.exhibit_url, (gltf: { scene: THREE.Object3D<THREE.Event>; }) => {
            value.uuid = gltf.scene.uuid;
            // TODO: add custom slider to adjust size
            let size = 1 / this.getSize(gltf.scene).length()
            size *= this.factor;
            gltf.scene.scale.set(size, size, size)
            // Alignment / Positioning
            let x = this.room.positions[value.position_id -1].x * this.factor
            let y = this.potests.parameters.height + this.getSize(gltf.scene).y
            let z = this.room.positions[value.position_id -1].y * this.factor
            switch (value.alignment) {
              case "l":
                z += this.potests.parameters.depth / 2
                break
              case "r":
                z -= this.potests.parameters.depth / 2
                break
              case "t":
                z += this.potests.parameters.width / 2
                break
              case "b":
                z -= this.potests.parameters.width / 2
            }
            gltf.scene.position.set(x, y, z)
            //gltf.scene
            this.scene.add( gltf.scene );
            console.log(`loaded object: ${value.exhibit_url}`)
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
    for (let i = 0; i < this.room.positions.length; i++){
      let cube = new THREE.Mesh(this.potests, this.basic_material);
      cube.position.set(this.room.positions[i].x * this.factor, this.potests.parameters.height / 2, this.room.positions[i].y * this.factor);
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
      this.controls!.lookSpeed = 0.002;
      this.controls!.movementSpeed = 100;
      this.controls!.lookVertical = false;
      this.controls!.mouseDragOn = false;
      this.controls!.autoForward = false


      // Inter
      window.addEventListener( 'pointerdown', (event: PointerEvent) => {
        // calculate pointer position in normalized device coordinates
        // (-1 to +1) for both components
        this.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1
        this.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1
        this.hoverExhibit()

      });
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


  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
   const dialogRef = this.dialog.open(ExhibitDialog, {
      width: '100%',
      data: {description: this.objectDescription, title: this.objectTitle},
      enterAnimationDuration,
      exitAnimationDuration,
    });

    this.dialogOpen = true
    console.log(this.animationid)
    cancelAnimationFrame(this.animationid!)

    dialogRef.afterClosed().subscribe(r => {
      this.dialogOpen = false
      this.animate()
    })
  }

hoverExhibit(){
    this.raycaster.setFromCamera(this.pointer, this.camera! )
    const intersects = this.raycaster.intersectObjects(this.scene.children)
    const values = this.exhibitArrangeService.getPositionConfigList().getValue();
            for (let value of values) {
                console.log(intersects[0])
                console.log(value)

                if (value.uuid == intersects[0].object.parent?.parent?.uuid) {
                  if (value.uuid != null) {
                    const object = this.scene.getObjectByProperty('uuid', value.uuid);
                    console.log(value.description)

                    this.objectDescription = value.description
                    this.objectTitle = value.title
                    this.openDialog('1000ms', '300ms')
                  }
              }
            }
      }

  animate = () => {
      if (!this.isAboutToDestroy && (!this.dialogOpen)) {
        this.animationid = requestAnimationFrame(this.animate);
      }

      this.controls?.update(this.clock.getDelta())
      this.renderer?.render(this.scene, this.camera!);
  }

  ngOnDestroy() {
    this.isAboutToDestroy = true
    this.scene.clear()
  }

  getSize(scene: THREE.Object3D){
    return new THREE.Box3().setFromObject(scene).getSize(new Vector3());
  }

}


@Component({
  selector: 'exhibit-dialog',
  templateUrl: 'exhibit-dialog.html',
})
export class ExhibitDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ExhibitDialog>) {

  }
}
