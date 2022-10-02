import { Component, OnInit } from '@angular/core';
import {NavbarServiceService} from "../../components/navbar/navbar-service.service";
import {FooterService} from "../../components/footer/footer.service";
import {GalleryService} from "../../shared/gallery.service";
import {Exhibition} from "../../shared/class/exhibition";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(public navbar: NavbarServiceService, public footer: FooterService, private gs: GalleryService) {}

  exhibitions: Exhibition[] = [];

  ngOnInit(): void {
    this.navbar.show()
    this.footer.show()
    this.gs.getAllExhibitions().subscribe(res => this.exhibitions = res);
  }

}
