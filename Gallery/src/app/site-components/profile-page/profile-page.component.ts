import { Component, OnInit } from '@angular/core';
import {NavbarServiceService} from "../../components/navbar/navbar-service.service";
import {FooterService} from "../../components/footer/footer.service";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  username : string = "Max Mustermann";

  constructor(public navbar: NavbarServiceService, public footer: FooterService) {
  }

  ngOnInit(): void {
    this.navbar.show()
    this.footer.show()
  }
}
