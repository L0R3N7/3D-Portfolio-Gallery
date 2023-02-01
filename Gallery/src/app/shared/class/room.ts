import {Position} from "./position";

export class Room{
  id : number;
  name : string;
  room_wall_url : string;
  wall_mat_url : string;
  room_floor_url : string;
  floor_mat_url : string;
  room_img_url: string;
  positions : Position[];
  floorRepeatTexture: number;


  constructor(id: number, name: string, room_wall_url: string, wall_mat_url: string, room_floor_url: string, floor_mat_url: string, room_img_url: string, positions: Position[], floorRepeatTexture: number) {
    this.id = id;
    this.name = name;
    this.room_wall_url = room_wall_url;
    this.wall_mat_url = wall_mat_url;
    this.room_floor_url = room_floor_url;
    this.floor_mat_url = floor_mat_url;
    this.room_img_url = room_img_url;
    this.positions = positions;
    this.floorRepeatTexture = floorRepeatTexture;
  }
}
