export class Tag{
  id : number;
  category_title : string;
  color : string;

  constructor(id: number, category_title: string, color: string) {
    this.id = id;
    this.category_title = category_title;
    this.color = color;
  }
}
