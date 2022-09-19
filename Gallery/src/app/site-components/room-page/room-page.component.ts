import { Component, OnInit } from '@angular/core';
import {NavbarServiceService} from "../../components/navbar/navbar-service.service";
import {FooterService} from "../../components/footer/footer.service";

@Component({
  selector: 'app-room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.scss']
})
export class RoomPageComponent implements OnInit {

  constructor(public navbar: NavbarServiceService, public footer: FooterService) { }

  ngOnInit(): void {
      this.navbar.hide()
      this.footer.hide()
  }

}
