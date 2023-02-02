import {Position} from "./position";

export class Exhibit{
  id : number;
  url : string;
  data_type : string;
  title : string;
  description : string;
  alignment: string | undefined
  position: Position | undefined
  scale: number | undefined

  constructor(id: number, model_url: string, data_type: string, title: string, desc: string, alignment: string | undefined, position: Position | undefined, scale: number | undefined) {
    this.id = id;
    this.url = model_url;
    this.data_type = data_type;
    this.title = title;
    this.description = desc;
    this.alignment = alignment
    this.position = position
    this.scale = scale
  }




}
