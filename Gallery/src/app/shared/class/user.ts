export class User{
  id: number;
  email: string;
  usesrname: string;
  password: string;
  icon_url: string;

  constructor(id: number, email: string, usesrname: string, password: string, icon_url: string) {
    this.id = id;
    this.email = email;
    this.usesrname = usesrname;
    this.password = password;
    this.icon_url = icon_url;
  }

  static hashClientsidePassword(password: string) : string {
    //Todo HashClientSide
    return password;
  }
}
