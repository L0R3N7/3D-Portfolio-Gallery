import { Component, OnInit } from '@angular/core';
import {NavbarServiceService} from "./navbar-service.service";
import {GalleryService} from "../../shared/gallery.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn ?: Boolean;

  constructor(public navbar: NavbarServiceService, public galleryService : GalleryService) {
    this.isLoggedIn = galleryService.isLoggedIn; 
  }

  ngOnInit(): void {
    this.navbar.white = false;
    this.navbar.visible = true;
    var inlineNav : any;
  }



}
