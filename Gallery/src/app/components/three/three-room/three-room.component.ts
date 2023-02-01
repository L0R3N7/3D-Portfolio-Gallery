import {
  Component,
  Input,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  OnChanges,
  SimpleChanges, Inject, createComponent, OnInit
} from '@angular/core';
import { Room } from 'src/app/shared/class/room';
import { Position } from 'src/app/shared/class/position';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {BoxGeometry, Object3D, PerspectiveCamera, Vector3} from "three";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {OutlinePass} from "three/examples/jsm/postprocessing/OutlinePass";
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer";
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass";
import {
  CreateExhibitionPageService
} from "../../../site-components/create-exhibition-page/create-exhibition-page.service";
import {GalleryService} from "../../../shared/gallery.service";

@Component({
  selector: 'app-three-room',
  templateUrl: './three-room.component.html',
  styleUrls: ['./three-room.component.scss']
})
export class ThreeRoomComponent implements AfterViewInit, OnDestroy, OnChanges{
  room ?: Room
  room_uuid: string[] = []
  @Input('mode') mode : String = "create";

  @ViewChild('threeCanvas') threeCanvas!: ElementRef;
  @ViewChild('lookupSize') lookupSize !: ElementRef;

  scene = new THREE.Scene()
  clock = new THREE.Clock()
  loader = new GLTFLoader()

  raycaster = new THREE.Raycaster()
  collisionRaycaster = new THREE.Raycaster()

  pointer = new THREE.Vector2()

  camera ?: THREE.PerspectiveCamera;
  camera2 ?: THREE.PerspectiveCamera;
  renderer ?: THREE.WebGLRenderer;
  controls ?: FirstPersonControls | OrbitControls;

  potests = new BoxGeometry(20, 70, 20);
  basic_material = new THREE.MeshBasicMaterial({color: 0x00ee00, opacity: .5})
  isAboutToDestroy = false;

  dialogOpen = false;
  animationid?: number
  objectDescription?: String
  objectTitle?: String
  objectUrl?: String

  composer?: EffectComposer;
  selectedObjects: Object3D[] = [];

  constructor(private createService: CreateExhibitionPageService, public dialog: MatDialog, private gs: GalleryService) {
    createService.wizRoom.subscribe(
      room => {
        this.room = room

        if (room != undefined){

          console.log("Tring to load sockels", room.positions)
          //Load Sockels
          for (let i = 0; i < room.positions.length; i++){
            this.loader.load('assets/three-d-objects/podest.gltf', (gltf: { scene: THREE.Object3D<THREE.Event>; }) => {
              console.log(gltf)
              gltf.scene.position.set(room.positions[i].x                                                                          , 0, room.positions[i].y)
              this.room_uuid.push(gltf.scene.uuid)
              this.scene.add(gltf.scene)
            })
          }

          //Load Room
          if(this.room_uuid.length > 0){
            this.room_uuid.forEach(room_uuid => {this.clearScene(room_uuid)})
            this.room_uuid = []
          }

          console.log("Loading Room")
          gs.getFile(room.room_wall_url.replace("/", "%2F")).subscribe(downloadedWall => {
            const wall_url = URL.createObjectURL(downloadedWall)
            console.log("loaded wall", room.room_wall_url)

            this.loader.load( wall_url, (gltf: { scene: THREE.Object3D<THREE.Event>; }) => {
              gltf.scene.scale.y = 350
              this.room_uuid.push(gltf.scene.uuid)
              this.scene.add( gltf.scene );
            });
          })

          gs.getFile(room.room_floor_url.replace("/", "%2F")).subscribe(downloadedFloor => {
            const floor_url = URL.createObjectURL(downloadedFloor)
            console.log("loaded floor", room.room_floor_url)

            this.loader.load( floor_url, (gltf: { scene: THREE.Object3D<THREE.Event>; }) => {
              this.scene.add( gltf.scene );
              this.room_uuid.push(gltf.scene.uuid)
            });
          })


          // Load exhibit based on the positionConfigList
          createService.wizPositionConfigList.subscribe(
            values => {
              for (let value of values) {
                // If there was an preexisting object delete it
                if (value.uuid) {
                  this.clearScene(value.uuid)
                }
                // If there is no possition don't draw the object
                if (!value.position_id || value.position_id == -1) {
                  continue;
                }
                // Todo: has to be changed and cashed somewhere so it mustn't allways download new
                gs.getFile(value.exhibit_url).subscribe(downloadedExhibit => {

                  const fileType = this.gs.getFileTypeCategoryByFileType(value.exhibit_type)
                  const url = URL.createObjectURL(downloadedExhibit)
                  let x = room.positions[value.position_id - 1].x * 100
                  let y = this.potests.parameters.height
                  let z = room.positions[value.position_id - 1].y * 100

                  console.log("Loading 3d Model: Position #", value.position_id, " ", x, y, z)


                  switch (fileType) {
                    case '3d': {
                      console.log("Loading 3d Data")
                      this.loader.load(url, (gltf: { scene: THREE.Object3D<THREE.Event>; }) => {
                        value.uuid = gltf.scene.uuid;
                        let size = this.getSize(gltf.scene)
                        gltf.scene.scale.set(1 / size.x * value.scale_factor, 1 / size.y * value.scale_factor, 1 / size.z * value.scale_factor)
                        // Alignment / Positioning
                        y += this.getSize(gltf.scene).y
                        switch (value.alignment) {
                          case "l":
                            z += 1 / size.z * value.scale_factor
                            break
                          case "r":
                            z -= 1 / size.z * value.scale_factor
                            break
                          case "t":
                            x += 1 / size.x * value.scale_factor
                            break
                          case "b":
                            x -= 1 / size.x * value.scale_factor
                        }
                        gltf.scene.position.set(x, y, z)
                        console.log(x,y,z)
                        //gltf.scene
                        this.scene.add(gltf.scene);
                      })
                      break;
                    }
                    case 'image': {
                      console.log("Loading Image")
                      const geometry = new THREE.BoxGeometry(100, 100, .1)
                      const texture = new THREE.TextureLoader().load(url)
                      texture.wrapS = THREE.RepeatWrapping;
                      texture.wrapT = THREE.RepeatWrapping;
                      texture.repeat.set( 1, 1 );
                      const material = new THREE.MeshBasicMaterial({map: texture})
                      const cube = new THREE.Mesh(geometry, material);
                      value.uuid = cube.uuid
                      this.scene.add(cube)
                      break;
                    }
                  }
                })
              }
            })
        }
      })
  }

  clearScene(uuid: string){
    if (uuid) {
      const object = this.scene.getObjectByProperty('uuid', uuid);
      if (object) {
        this.scene.remove(object);
        object.clear()
      }
    }
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
    const bulbLight = new THREE.PointLight( 0xffffff, 3, 1000, 2);
    const bulbMat = new THREE.MeshStandardMaterial( {
      emissive: 0xffffff,
      emissiveIntensity: 1,
      color: 0x000000
    } );
    bulbLight.add( new THREE.Mesh( bulbGeometry, bulbMat ) );
    bulbLight.position.set( 0, 100, 0 );
    bulbLight.castShadow = true;
    this.scene.add( bulbLight );




      this.animate();
  }

  setup = () => {
    this.camera = new THREE.PerspectiveCamera( 80, this.lookupSize.nativeElement.offsetWidth / this.lookupSize.nativeElement.offsetHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.threeCanvas.nativeElement
    });
    this.renderer?.setSize( this.lookupSize.nativeElement.offsetWidth, this.lookupSize.nativeElement.offsetHeight );
    this.scene.background = new THREE.Color( 0xf7f8fa )
    this.camera?.position.set( - 1.8, 100, 2.7 );


    if (this.mode == "create"){
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.camera?.position.set( - 1.8, 180, 10 );

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
        this.clickExhibit()
      });

      window.addEventListener( 'pointermove', (event: PointerEvent) => {
        // calculate pointer position in normalized device coordinates
        // (-1 to +1) for both components
        this.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1
        this.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1
        this.hoverExhibit()
      });

      this.camera2 = this.camera.clone()

      document.addEventListener('keydown', (event: KeyboardEvent) => {
          this.handleCollision()
      })
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
      maxWidth: '100vw',
      maxHeight: '50vh',
      width: '100%',
      height: '100%',
      data: {description: this.objectDescription, title: this.objectTitle, objectUrl: this.objectUrl},
      enterAnimationDuration,
      exitAnimationDuration,
    });

    this.dialogOpen = true
    console.log(this.animationid)
    cancelAnimationFrame(this.animationid!)
    this.clock.stop()

    dialogRef.afterClosed().subscribe(r => {
      this.dialogOpen = false
      this.animate()
      this.clock.start()
    })
  }

handleCollision(){
 this.detectCollision();
 this.clock.start();
}

clickExhibit(){
    this.raycaster.setFromCamera(this.pointer, this.camera! )
    const intersects = this.raycaster.intersectObjects(this.scene.children)
  console.log(this.pointer.x)
    const values = this.createService.wizPositionConfigList.getValue();
            for (let value of values) {
                if (value.uuid == intersects[0].object.parent?.parent?.uuid) {
                  if (value.uuid != null) {
                    const object = this.scene.getObjectByProperty('uuid', value.uuid);

                    this.objectDescription = value.description
                    this.objectTitle = value.title
                    this.objectUrl = value.exhibit_url
                    this.openDialog('1000ms', '300ms')
                  }
              }
            }
      }

  hoverExhibit(){
    this.raycaster.setFromCamera(this.pointer, this.camera! )
    const intersects = this.raycaster.intersectObjects(this.scene.children)
    const values = this.createService.wizPositionConfigList.getValue();


    for (let value of values) {
      if (value.uuid != null) {
      if (value.uuid == intersects[0].object.parent?.parent?.uuid) {


          const object = this.scene.getObjectByProperty('uuid', value.uuid);
          const renderPass = new RenderPass( this.scene, this.camera! );
          this.composer = new EffectComposer(this.renderer!)
          this.composer.addPass( renderPass );
          const outlinePass = new OutlinePass( new THREE.Vector2( window.innerWidth, window.innerHeight ), this.scene, this.camera! );
          this.composer.addPass( outlinePass );

          this.addSelectedObjects(object!);

          outlinePass.selectedObjects = this.selectedObjects;


        }
      }
    }
  }

  addSelectedObjects( object: Object3D ){
    this.selectedObjects = [];
    this.selectedObjects.push(object)
  }

  detectCollision(){
    this.collisionRaycaster.set(this.camera!.position, this.camera2!.position.normalize())
    this.collisionRaycaster.far = 100
    const intersects = this.collisionRaycaster.intersectObjects(this.scene.children)
    if(intersects.length > 0){
       this.clock.stop()
    }
  }



  animate = () => {
      if (!this.isAboutToDestroy && (!this.dialogOpen)) {
        this.animationid = requestAnimationFrame(this.animate);
      }


      this.controls?.update(this.clock.getDelta())
      if (this.mode != "create"){
        var cameraChanged = this.compareCameras(this.camera!, this.camera2!)
        if (cameraChanged){
          this.detectCollision()
        }
      }


    this.renderer?.render(this.scene, this.camera!);
    this.composer?.render()

    if(this.mode != "create"){
      this.camera2?.copy(this.camera!)
    }
  }

  ngOnDestroy() {
    this.isAboutToDestroy = true
    this.scene.clear()
  }

  getSize(scene: THREE.Object3D){
    return new THREE.Box3().setFromObject(scene).getSize(new Vector3());
  }
  compareCameras(camera: PerspectiveCamera, camera2: PerspectiveCamera): boolean{
    if(camera.position.x == camera2.position.x && camera.position.y == camera2.position.y){
      return false
    }else{
      return true
    }
  }

}


@Component({
  selector: 'exhibit-dialog',
  templateUrl: 'exhibit-dialog.html',
  styleUrls: ['./three-room.component.scss']
})
  export class ExhibitDialog implements AfterViewInit{
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ExhibitDialog>) {

  }
  //DetailView
  @ViewChild('threeDetailCanvas') threeDetailCanvas!: ElementRef;
  @ViewChild('lookUpSizeDetail') lookUpSizeDetail!: ElementRef;
  cameraDetail ?: THREE.PerspectiveCamera;
  rendererDetail ?: THREE.WebGLRenderer;
  controlsDetail ?: OrbitControls;
  sceneDetail = new THREE.Scene()
  loaderDetail = new GLTFLoader().setPath( 'assets/three-d-objects/' );

  ngAfterViewInit() {
    this.setup()
    this.animate()
    this.loadExhibit()
  }

  setup = () => {
    this.rendererDetail = new THREE.WebGLRenderer({
      canvas: this.threeDetailCanvas.nativeElement
    });

    this.cameraDetail = new THREE.PerspectiveCamera( 100, this.lookUpSizeDetail.nativeElement.offsetWidth / this.lookUpSizeDetail.nativeElement.offsetWidth, 0.1, 1000);
    this.cameraDetail?.position.set( - 1.8, 180, 10 );
    this.controlsDetail = new OrbitControls(this.cameraDetail, this.rendererDetail.domElement)
    this.sceneDetail.background = new THREE.Color( 0xf7f8fa )

  }

  animate = () => {
    requestAnimationFrame( this.animate );
    this.controlsDetail?.update();
    this.rendererDetail?.render(this.sceneDetail, this.cameraDetail!)
  }

  loadExhibit(){
    this.loaderDetail.load(this.data.objectUrl,(gltf: { scene: THREE.Object3D<THREE.Event>; }) => {
      this.sceneDetail.add(gltf.scene)
    })
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
    this.sceneDetail.add( bulbLight );
  }

}
