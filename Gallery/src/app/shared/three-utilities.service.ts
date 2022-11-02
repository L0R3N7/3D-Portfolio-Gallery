import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class ThreeUtilitiesService {

   public scene = new THREE.Scene();
   public camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 1000 );
   public clock = new THREE.Clock();

  constructor() {
    this.scene.background = new THREE.Color( 0xf7f8fa )
    this.camera.position.set( - 1.8, 100, 2.7 );
  }

  loader(){

  }
 
}
