import {AfterViewInit, Component, OnInit} from "@angular/core";
import {NavbarServiceService} from "../../components/navbar/navbar-service.service";
import {FooterService} from "../../components/footer/footer.service";
import {ActivatedRoute} from "@angular/router";
import {GalleryService} from "../../shared/gallery.service";
import {ExhibitionUser} from "../../shared/class/exhibition-user";
import {Exhibition} from "../../shared/class/exhibition";


@Component({
  selector: 'app-room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.scss'],

})
export class RoomPageComponent implements OnInit {
  constructor(public navbar: NavbarServiceService, public footer: FooterService, private route: ActivatedRoute, private gs: GalleryService) {
  }

  id?: number;
  private sub: any;
  exhibtion = {} as Exhibition;

  ngOnInit(): void {

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    })

    this.navbar.white = true;
    this.navbar.hide()
    this.footer.hide()

  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }





}




