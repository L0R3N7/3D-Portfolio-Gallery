import { Component, OnInit } from '@angular/core';
import {NavbarServiceService} from "../../components/navbar/navbar-service.service";
import {FooterService} from "../../components/footer/footer.service";
import * as THREE from 'three';


@Component({
  selector: 'app-room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.scss']
})
export class RoomPageComponent implements OnInit {
  lookVertical: boolean = false;
  lookSpeed: number = 0.02;
  movementSpeed: number = 2;

  constructor(public navbar: NavbarServiceService, public footer: FooterService) { }

  ngOnInit(): void {
      this.navbar.white = false;
      this.navbar.hide()
      this.footer.hide()
  }

}


