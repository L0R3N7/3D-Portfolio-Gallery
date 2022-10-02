import { Component, OnInit } from '@angular/core';
import {NavbarServiceService} from "../../components/navbar/navbar-service.service";
import {FooterService} from "../../components/footer/footer.service";
import {Exhibition} from "../../shared/class/exhibition";
import {GalleryService} from "../../shared/gallery.service";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  username : string = "Max Mustermann";
  isDeleteMode : boolean = true;

  exhibition_list ?: Exhibition[];

  constructor(public navbar: NavbarServiceService, public footer: FooterService, public gallery_service: GalleryService) {
    gallery_service.getAllExhibitions().subscribe( (e) => {
      this.exhibition_list = e;
    })
  }

  ngOnInit(): void {
    this.navbar.show()
    this.footer.show()
  }

  onDelete() {
    this.isDeleteMode = !this.isDeleteMode;
  }

  //Todo add server remove; add "are your sure?" prompt
  deleteExhibtionEvent(e: Exhibition) {
    this.exhibition_list?.splice(this.exhibition_list?.indexOf(e), 1)
  }
}
