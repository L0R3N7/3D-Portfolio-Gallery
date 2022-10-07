import { Component, OnInit } from '@angular/core';
import {NavbarServiceService} from "./navbar-service.service";
import {GalleryService} from "../../shared/gallery.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public navbar: NavbarServiceService) {
  }

  ngOnInit(): void {
    this.navbar.white = false;
    this.navbar.visible = true;
    var inlineNav : any;
  }



}
