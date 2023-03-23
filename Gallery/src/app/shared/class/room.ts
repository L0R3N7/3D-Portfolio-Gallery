import {Position} from "./position";

export class Room{
  id : number;
  name : string;
  room_wall_url : string;
  wall_mat_url : string;
  room_floor_url : string;
  floor_mat_url : string;
  thumbnail_url: string;
  positions : Position[];
  floorRepeatTexture: number;


  constructor(id: number, name: string, room_wall_url: string, wall_mat_url: string, room_floor_url: string, floor_mat_url: string, thumbnail_url: string, positions: Position[], floorRepeatTexture: number) {
    this.id = id;
    this.name = name;
    this.room_wall_url = room_wall_url;
    this.wall_mat_url = wall_mat_url;
    this.room_floor_url = room_floor_url;
    this.floor_mat_url = floor_mat_url;
    this.thumbnail_url = thumbnail_url;
    this.positions = positions;
    this.floorRepeatTexture = floorRepeatTexture;
  }
}
