export class AddExhibitionDTO{
  thumbnail_url?: string
  title: string
  description: string
  room_id: number
  user_id: number
  category_ids: number[]
  exhibits: (AddExhibitDTO | undefined)[]


  constructor(title: string, description: string, room_id: number, user_id: number, category_ids: number[], exhibits: (AddExhibitDTO | undefined)[], thumbnail_url?: string) {
    this.thumbnail_url = thumbnail_url;
    this.title = title;
    this.description = description;
    this.room_id = room_id;
    this.user_id = user_id;
    this.category_ids = category_ids;
    this.exhibits = exhibits;
  }
}

export class AddExhibitDTO{
  data_type: string
  description: string
  title: string
  url: string
  scale: number
  alignment: string
  theme_id: number
  position_id: number

  constructor(data_type: string, description: string, title: string, url: string, scale: number = 1, alignment: string = 'c', theme_id: number, position_id: number) {
    this.data_type = data_type;
    this.description = description;
    this.title = title;
    this.url = url;
    this.scale = scale;
    this.alignment = alignment;
    this.theme_id = theme_id;
    this.position_id = position_id;
  }
}
