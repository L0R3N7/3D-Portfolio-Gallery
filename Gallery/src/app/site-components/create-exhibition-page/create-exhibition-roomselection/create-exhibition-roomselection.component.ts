import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {GalleryService} from "../../../shared/gallery.service";
import {Room} from "../../../shared/class/room";
import {CreateExhibitionPageService} from "../create-exhibition-page.service";

@Component({
  selector: 'app-create-exhibition-roomselection',
  templateUrl: './create-exhibition-roomselection.component.html',
  styleUrls: ['./create-exhibition-roomselection.component.scss']
})
export class CreateExhibitionRoomselectionComponent {
  rooms: Room[] = [];
  filteredRoom: Room[] = [];
  selectedRoom_id ?: number = undefined;

  constructor(gs: GalleryService, private cs: CreateExhibitionPageService) {
    gs.getAllRooms().subscribe(res => {
      console.log("ser")

      this.rooms = res
      this.filteredRoom = this.rooms.filter(value => {return value.position_amount > cs.wizExhibits.value.length})
    });
    cs.wizRoomId.subscribe(value => {
      if (value){
        this.selectedRoom_id = value
      }
    })
  }

  selectRoom(selectedId:number){
    this.cs.wizRoomId.next(selectedId)
    this.cs.saveRoomId()
  }

  getFilteredRooms() : Room[] {
    return this.rooms.filter(value => {
        return value.positions.length < this.cs.wizExhibits.value.length
    })
  }
}
