import { Component, OnInit } from '@angular/core';
import {NavbarServiceService} from "../../components/navbar/navbar-service.service";
import {FooterService} from "../../components/footer/footer.service";
import {Exhibition} from "../../shared/class/exhibition";
import {GalleryService} from "../../shared/gallery.service";
import {ExhibitionUser} from "../../shared/class/exhibition-user";
import {AuthService} from "../auth/auth.service";
import {User} from "../../shared/class/user";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  user?: User;
  isDeleteMode : boolean = true;
  exhibition_list ?: ExhibitionUser[];

  constructor(public navbar: NavbarServiceService, public footer: FooterService, gallery_service: GalleryService, private authService: AuthService) {
    const userId = localStorage.getItem('user_id') ?? ''
    this.authService.getUser(userId).subscribe(user => {
      this.user = user
      this.authService.getUserExhibtions(userId).subscribe(exhibitionList => {
        this.exhibition_list = exhibitionList.map(exhibition => { return new ExhibitionUser(exhibition, this.user?.icon_url ?? '', this.user?.usesrname ?? 'you')})
      })
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
  //deleteExhibtionEvent(e: Exhibition) {
  //  this.exhibition_list?.splice(this.exhibition_list?.indexOf(e), 1)
 // }
}
