import { NgtGLTFLoader } from '@angular-three/soba/loaders';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-three-d-object-loader',
  templateUrl: './three-d-object-loader.component.html',
  styleUrls: ['./three-d-object-loader.component.scss'],
  
})

export class ThreeDObjectLoaderComponent implements OnInit {
  @Input('src') source?: string;

  threeDObject$ = this.gltfLoader.load('/assets/three-d-objects/podest_01.gltf')
  
  constructor(private gltfLoader: NgtGLTFLoader) {
  }

  ngOnInit(): void {
  }

}


