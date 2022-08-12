import { Component, OnInit } from '@angular/core';
import {GalleryService} from "../../../shared/gallery.service";
import {Room} from "../../../shared/room";

@Component({
  selector: 'app-create-exhibition-roomselection',
  templateUrl: './create-exhibition-roomselection.component.html',
  styleUrls: ['./create-exhibition-roomselection.component.scss']
})
export class CreateExhibitionRoomselectionComponent implements OnInit {
  rooms: Room[] = [];


  constructor(public gs: GalleryService) { }

  ngOnInit(): void {
    this.gs.getAllRooms().subscribe(res => this.rooms = res);
  }

}
