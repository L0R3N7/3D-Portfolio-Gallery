import {Exhibit} from "./exhibit";
import {Room} from "./room";
import {Tag} from "./tag";

export class Exhibition {
  id: number;
  thumbnail_url : string | undefined;
  title: string;
  room_id: number;
  description : string | undefined;
  exhibits : Exhibit[] | undefined;
  room : Room | undefined;
  tags : Tag[] | undefined;

  constructor(id: number, thumbnail_url: string | undefined, title: string, room_id: number, description: string | undefined, exhibits: Exhibit[] | undefined, room: Room | undefined, tag: Tag[] | undefined) {
    this.id = id;
    this.thumbnail_url = thumbnail_url;
    this.title = title;
    this.room_id = room_id;
    this.description = description;
    this.exhibits = exhibits;
    this.room = room;
    this.tags = tag;
  }
}
