import {Component, Input, OnInit, Output} from '@angular/core';
import {Room} from "../../shared/class/room";
import {GalleryService} from "../../shared/gallery.service";

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss']
})
export class RoomCardComponent implements OnInit {
  @Input() room?: Room;
  imageUrl = "";

  constructor(private gallery: GalleryService) { }

  ngOnInit(): void {
    this.imageUrl = this.gallery.getValidImageString(this.room?.thumbnail_url ?? "");
    console.log("asdf", this.room)
  }

}
