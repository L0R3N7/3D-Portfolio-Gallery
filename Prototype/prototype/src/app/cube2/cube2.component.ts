import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as THREE from "three";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {GLTF, GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {Object3D, Spherical, Vector3} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {CSS2DRenderer} from "three/examples/jsm/renderers/CSS2DRenderer";

@Component({
  selector: 'app-cube2',
  templateUrl: './cube2.component.html',
  styleUrls: ['./cube2.component.scss']
})

export class Cube2Component implements OnInit, AfterViewInit {

  @ViewChild('canvas') private canvasRef!: ElementRef;

  //* Stage Properties

  @Input() public fieldOfView: number = 1;

  @Input('nearClipping') public nearClippingPane: number = 1;

  @Input('farClipping') public farClippingPane: number = 1000;


  //? Scene properties
  private camera!: THREE.PerspectiveCamera;

  private controls!: OrbitControls;

  private ambientLight!: THREE.AmbientLight;

  private light1!: THREE.PointLight;

  private light2!: THREE.PointLight;

  private light3!: THREE.PointLight;

  private light4!: THREE.PointLight;

  private model: any;

  private directionalLight!: THREE.DirectionalLight;

  //? Helper Properties (Private Properties);

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private loaderGLTF = new GLTFLoader();

  private renderer!: THREE.WebGLRenderer;

  private scene!: THREE.Scene;

   private animateModel() {
    if (this.model) {
      this.model.rotation.z += 0.00;
    }
  }
  private createControls = () => {
    const renderer = new CSS2DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0px';
    document.body.appendChild(renderer.domElement);
    this.controls = new OrbitControls(this.camera, renderer.domElement);
    this.controls.autoRotate = true;
    this.controls.enableZoom = true;
    this.controls.enablePan = false;
    this.controls.update();
  };



  private createScene() {
    //* Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xd4d4d8)
    this.loaderGLTF.load('assets/podest_style/podest_01.gltf', (gltf: GLTF) => {
      this.model = gltf.scene.children[0];
      console.log(this.model);
      var box = new THREE.Box3().setFromObject(this.model);
      box.getCenter(this.model.position); // this re-sets the mesh position
      this.model.position.multiplyScalar(-1);
      this.scene.add(this.model);
    });
    //*Camera
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera
      ( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    this.camera.position.x = 300;
    this.camera.position.y = 600;
    this.camera.position.z = 600;
    this.ambientLight = new THREE.AmbientLight(0x00000, 100);
    this.scene.add(this.ambientLight);
    this.directionalLight = new THREE.DirectionalLight(0xffdf04, 0.4);
    this.directionalLight.position.set(0, 1, 0);
    this.directionalLight.castShadow = true;
    this.scene.add(this.directionalLight);
    this.light1 = new THREE.PointLight(0x4b371c, 10);
    this.light1.position.set(0, 200, 400);
    this.scene.add(this.light1);
    this.light2 = new THREE.PointLight(0x4b371c, 10);
    this.light2.position.set(500, 100, 0);
    this.scene.add(this.light2);
    this.light3 = new THREE.PointLight(0x4b371c, 10);
    this.light3.position.set(0, 100, -500);
    this.scene.add(this.light3);
    this.light4 = new THREE.PointLight(0x4b371c, 10);
    this.light4.position.set(-500, 300, 500);
    this.scene.add(this.light4);
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }


  private startRenderingLoop() {
    //* Renderer
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    let component: Cube2Component = this;
    (function render() {
      component.renderer.render(component.scene, component.camera);
      component.animateModel();
      requestAnimationFrame(render);
    }());
  }

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.createScene();
    this.startRenderingLoop();
    this.createControls();
  }


  handleClick($event: MouseEvent) {
    console.log("test")
  }
}
