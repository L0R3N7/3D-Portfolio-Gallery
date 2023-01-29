import {Exhibition} from "./exhibition";

export class ExhibitionUser {
  exhibition: Exhibition;
  user_icon_url: string
  user_name: string

  constructor(exhibition: Exhibition, user_icon_url: string, user_name: string) {
    this.exhibition = exhibition;
    this.user_icon_url = user_icon_url;
    this.user_name = user_name;
  }
}
