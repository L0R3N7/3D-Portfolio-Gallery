import { Component, OnInit, Input } from '@angular/core';
import { Room } from 'src/app/shared/class/room';
import { Position } from 'src/app/shared/class/position';

@Component({
  selector: 'app-three-room',
  templateUrl: './three-room.component.html',
  styleUrls: ['./three-room.component.scss']
})
export class ThreeRoomComponent implements OnInit {
  position_arr : Position[] = [new Position(0, 0, 0, 0, false)]
  @Input('room') room : Room = new Room(0,  "small room", 0, "https://www.smb.museum/uploads/tx_smb/news/news_67970/Neues-Museum_Raum-Prolog_Achim_Kleuker_xl.jpg", "2.gltf", this.position_arr)

  
  constructor() { }

  ngOnInit(): void {
  }

}
