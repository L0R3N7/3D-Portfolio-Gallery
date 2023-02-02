import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Exhibition} from "../../shared/class/exhibition";
import {ExhibitionUser} from "../../shared/class/exhibition-user";
import {GalleryService} from "../../shared/gallery.service";

@Component({
  selector: 'app-exhibition-card',
  templateUrl: './exhibition-card.component.html',
  styleUrls: ['./exhibition-card.component.scss']
})
export class ExhibitionCardComponent implements OnInit {

  @Input('exhibtion') exhibition?: ExhibitionUser;
  @Input('delete') isDeleteMode : boolean = false;
  @Output('delete') deleteEvent : EventEmitter<Exhibition> = new EventEmitter<Exhibition>();
  thumbnail?: String

  constructor(private gs: GalleryService) {
  }

  ngOnInit(): void {
    console.log(this.exhibition?.exhibition)

    this.thumbnail = this.exhibition?.exhibition.thumbnail_url
    this.thumbnail = "http://localhost:8080/api/exhibitions/downloadImageFile/" + this.thumbnail?.replace("/", "%2F")
  }

  onDelete() {
    this.deleteEvent.emit(this.exhibition?.exhibition) ;
  }

}
