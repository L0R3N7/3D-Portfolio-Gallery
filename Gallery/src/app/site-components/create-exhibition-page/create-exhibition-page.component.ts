import { Component, OnInit } from '@angular/core';
import {NavbarServiceService} from "../../components/navbar/navbar-service.service";
import {FooterService} from "../../components/footer/footer.service";

@Component({
  selector: 'app-create-exhibition-page',
  templateUrl: './create-exhibition-page.component.html',
  styleUrls: ['./create-exhibition-page.component.scss']
})
export class CreateExhibitionPageComponent implements OnInit {

  constructor(public navbar: NavbarServiceService, public footer: FooterService) { }

  ngOnInit(): void {
    this.navbar.hide()
    this.footer.hide()
  }

}
