export class User{
  id: number;
  email: string;
  user_name: string;
  password: string;
  icon_url: string;

  constructor(id: number, email: string, user_name: string, password: string, icon_url: string) {
    this.id = id;
    this.email = email;
    this.user_name = user_name;
    this.password = password;
    this.icon_url = icon_url;
  }
}
