export class Exhibit{
  id : number;
  model_url : string;
  data_type : string;
  title : string;
  desc : string;

  constructor(id: number, model_url: string, data_type: string, title: string, desc: string) {
    this.id = id;
    this.model_url = model_url;
    this.data_type = data_type;
    this.title = title;
    this.desc = desc;
  }
}
