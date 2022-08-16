import { Component, OnInit } from '@angular/core';
import {NavbarServiceService} from "../../components/navbar/navbar-service.service";
import {FooterService} from "../../components/footer/footer.service";

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  constructor(public navbar: NavbarServiceService, public footer: FooterService) { }

  ngOnInit(): void {
    this.navbar.hide()
    this.navbar.changeWhite()
    this.footer.hide()
  }

}
