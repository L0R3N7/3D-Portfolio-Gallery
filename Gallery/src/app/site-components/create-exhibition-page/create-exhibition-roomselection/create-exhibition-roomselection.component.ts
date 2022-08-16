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

  @Output() roomSelectedEvent = new EventEmitter<number>();

  constructor(public gs: GalleryService) { }

  selectRoom(selectedId:number){
    this.selectedRoom_id = selectedId;
    this.roomSelectedEvent.emit(selectedId);
  }

  ngOnInit(): void {
    this.gs.getAllRooms().subscribe(res => this.rooms = res);
  }

}
