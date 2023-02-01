export class Position{
  id : number;
  room_id : number;
  x : number;
  y : number;
  is_Wall : boolean;
  rotation ?: number;

  constructor(id: number, room_id: number, x: number, y: number, is_Wall: boolean, rotation ?: number) {
    this.id = id;
    this.room_id = room_id;
    this.x = x;
    this.y = y;
    this.is_Wall = is_Wall;
    this.rotation = rotation;
  }
}
