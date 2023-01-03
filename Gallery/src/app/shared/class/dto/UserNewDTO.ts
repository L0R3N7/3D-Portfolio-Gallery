export class UserNewDTO{
  user_name: string
  email: string
  iconURL: string
  password: string

  constructor(user_name: string, email: string, iconURL: string, password: string) {
    this.user_name = user_name;
    this.email = email;
    this.iconURL = iconURL;
    this.password = password;
  }
}
