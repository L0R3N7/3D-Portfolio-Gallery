import {Position} from "./position";

export class Room{
  id : number;
  name : string;
  position_amount: number;
  room_img_url: string;
  room_url : string;
  positions : Position[] | undefined;


  constructor(id: number, name: string, position_amount: number, room_img_url: string, room_url: string, positions: Position[] | undefined) {
    this.id = id;
    this.name = name;
    this.position_amount = position_amount;
    this.room_img_url = room_img_url;
    this.room_url = room_url;
    this.positions = positions;
  }
}
