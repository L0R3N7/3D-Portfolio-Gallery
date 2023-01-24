import {Component} from '@angular/core';
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
    cs.wizRoom.subscribe(value => {
      if (value){
        this.selectedRoom_id = value.id
      }
    })
  }

  selectRoom(selectedId:number){
    let tempRoom = this.getLocalRoomById(selectedId)

    if (tempRoom.length == 1){
      this.cs.wizRoom.next(tempRoom[0])
      this.cs.saveRoom()
    }
  }

  getFilteredRooms() : Room[] {
    return this.rooms.filter(value => {
        return value.positions.length < this.cs.wizExhibits.value.length
    })
  }

  getLocalRoomById(id: number): Room[]{
    return this.rooms.filter(value => {return value.id == id})
  }
}
