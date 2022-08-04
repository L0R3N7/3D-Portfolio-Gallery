import { Component, OnInit } from '@angular/core';
import {NavbarServiceService} from "../../components/navbar/navbar-service.service";
import {FooterService} from "../../components/footer/footer.service";

@Component({
  selector: 'app-log-signin-page',
  templateUrl: './log-signin-page.component.html',
  styleUrls: ['./log-signin-page.component.scss']
})
export class LogSigninPageComponent implements OnInit {

  constructor(public navbar: NavbarServiceService, public footer: FooterService) { }

  ngOnInit(): void {
    this.navbar.hide()
    this.footer.hide()
  }

}
