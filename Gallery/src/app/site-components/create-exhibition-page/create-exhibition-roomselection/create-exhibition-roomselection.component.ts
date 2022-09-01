import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GalleryService} from "../../../shared/gallery.service";
import {Room} from "../../../shared/room";

@Component({
  selector: 'app-create-exhibition-roomselection',
  templateUrl: './create-exhibition-roomselection.component.html',
  styleUrls: ['./create-exhibition-roomselection.component.scss']
})
export class CreateExhibitionRoomselectionComponent implements OnInit {
  rooms: Room[] = [];
  selectedRoom_id : number = -1;
  room3dUrl: string = "";

  @Output() roomSelectedEvent = new EventEmitter<number>();

  constructor(public gs: GalleryService) { }

  selectRoom(selectedId:number){
    this.selectedRoom_id = selectedId;
    this.room3dUrl = this.rooms[selectedId-1].room_url;
    this.roomSelectedEvent.emit(selectedId);
    console.log(this.room3dUrl)
  }

  ngOnInit(): void {
    this.gs.getAllRooms().subscribe(res => this.rooms = res);
  }

}
