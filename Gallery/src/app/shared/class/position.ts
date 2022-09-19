export class Position{
  id : number;
  room_id : number;
  x : number;
  y : number;
  is_Wall : boolean;


  constructor(id: number, room_id: number, x: number, y: number, is_Wall: boolean) {
    this.id = id;
    this.room_id = room_id;
    this.x = x;
    this.y = y;
    this.is_Wall = is_Wall;
  }
}
