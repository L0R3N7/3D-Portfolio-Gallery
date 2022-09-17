import {Exhibit} from "./exhibit";
import {Room} from "./room";

export interface Exhibition {
  id: number,
  thumbnail_url ?: string,
  title: string,
  room_id: number,
  description ?: string,
  exhibits ?: Exhibit[]
  rooms ?: Room
}
