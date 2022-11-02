import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NavbarServiceService} from "../../components/navbar/navbar-service.service";
import {FooterService} from "../../components/footer/footer.service";
import * as THREE from 'three';
import {Camera, Object3D} from "three";
import {FirstPersonControls} from "three/examples/jsm/controls/FirstPersonControls";
import {NgtComponentStore, NgtStore} from "@angular-three/core";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {animate} from "@angular/animations";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";


@Component({
  selector: 'app-room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.scss'],

})
export class RoomPageComponent implements OnInit{

  constructor(public navbar: NavbarServiceService, public footer: FooterService ) {

  }

  ngOnInit(): void {
    const scene = new THREE.Scene();

      scene.background = new THREE.Color( 0xf7f8fa )
      const camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 1000 );
      camera.position.set( - 1.8, 100, 2.7 );
      const clock = new THREE.Clock();

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( renderer.domElement );

      this.navbar.white = false;
      this.navbar.hide()
      this.footer.hide()

     const loader = new GLTFLoader().setPath( 'assets/three-d-objects/room/' );
     loader.load( 'walls/2.gltf', onLoad);
    const controls = new FirstPersonControls(camera, renderer.domElement)

    //controls.lookSpeed = 0.1;
    //controls.movementSpeed = 1;

      function animate(){
        requestAnimationFrame( animate );
        controls.update(clock.getDelta())
        renderer.render( scene, camera );
      }

     function onLoad(gltf: { scene: THREE.Object3D<THREE.Event>; }){
        scene.add( gltf.scene );
    }
    //animate()
  }

}


