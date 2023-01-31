import { Component, OnInit } from '@angular/core';
import {NavbarServiceService} from "./navbar-service.service";
import {GalleryService} from "../../shared/gallery.service";
import {AuthService} from "../../site-components/auth/auth.service";
import {User} from "../../shared/class/user";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user ?: User

  constructor(public navbar: NavbarServiceService, public auth: AuthService) {
    const userId = localStorage.getItem('user_id') ?? ''
    auth.getUser(userId).subscribe(user => {
      this.user = user
    })
  }

  ngOnInit(): void {
    this.navbar.white = false;
    this.navbar.visible = true;
  }
}
