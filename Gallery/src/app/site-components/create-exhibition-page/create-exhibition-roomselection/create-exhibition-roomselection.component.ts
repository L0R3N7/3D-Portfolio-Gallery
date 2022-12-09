import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {GalleryService} from "../../../shared/gallery.service";
import {Room} from "../../../shared/class/room";

@Component({
  selector: 'app-create-exhibition-roomselection',
  templateUrl: './create-exhibition-roomselection.component.html',
  styleUrls: ['./create-exhibition-roomselection.component.scss']
})
export class CreateExhibitionRoomselectionComponent implements OnInit {
  rooms: Room[] = [];
  selectedRoom_id : number = -1;
  room3dUrl: string = "";
  rangevalue = 1;
  @ViewChild("resetButton") button : ElementRef | undefined;

  @Output() roomSelectedEvent = new EventEmitter<number>();

  constructor(public gs: GalleryService) { }

  selectRoom(selectedId:number){
    this.button?.nativeElement.click;
    this.selectedRoom_id = selectedId;
    this.roomSelectedEvent.emit(selectedId);
    // @ts-ignore
    setTimeout(this.setRoomName(), 500);
    console.log(this.room3dUrl)
  }

  setRoomName(){
    this.room3dUrl = this.rooms[this.selectedRoom_id-1].room_url;
  }

  ngOnInit(): void {
    this.gs.getAllRooms().subscribe(res => this.rooms = res);
  }

  test(value: string) {
    this.rangevalue = parseInt(value);
  }
}
