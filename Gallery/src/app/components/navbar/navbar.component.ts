import { Component, OnInit } from '@angular/core';
import {NavbarServiceService} from "./navbar-service.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public navbar: NavbarServiceService) { }

  ngOnInit(): void {
    var inlineNav : any;
  }



}
