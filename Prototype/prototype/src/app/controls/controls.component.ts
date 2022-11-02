import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as THREE from 'three';
import {FirstPersonControls} from "three/examples/jsm/controls/FirstPersonControls";
import {toRelativeImport} from "@angular/compiler-cli";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    const clock = new THREE.Clock();

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );


    const loader = new GLTFLoader().setPath( 'assets/' );
    loader.load( 'podest_style/podest_01.gltf', animate);

    const controls = new FirstPersonControls(camera, renderer.domElement)
    controls.lookSpeed = 0.1;
    controls.movementSpeed = 1;
    controls.lookVertical = false;
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 5;

    function animate() {
      requestAnimationFrame( animate );
      cube.rotation.y += 0.01;
      cube.rotation.x += 0.01;
      controls.update(clock.getDelta() )
      renderer.render( scene, camera );
    };


    animate()
  }





}
