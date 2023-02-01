export class Position{
  id : number;
  room_id : number;
  x : number;
  y : number;
  is_wall : boolean;
  rotation ?: number;

  constructor(id: number, room_id: number, x: number, y: number, is_wall: boolean, rotation ?: number) {
    this.id = id;
    this.room_id = room_id;
    this.x = x;
    this.y = y;
    this.is_wall = is_wall;
    this.rotation = rotation;
  }
}
