import {Component, Input, OnInit} from '@angular/core';
import {NgtRenderState, NgtVector3} from "@angular-three/core";
import {Mesh} from "three";

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.scss']
})
export class CubeComponent implements OnInit {
  @Input() position?: NgtVector3;

  hovered = false;
  active = false;

  constructor() { }

  ngOnInit(): void {
  }

  onCubeBeforeRender($event: { state: NgtRenderState; object: Mesh }) {
    const cube = $event.object;
    cube.rotation.x += 0.01;
  }
}
