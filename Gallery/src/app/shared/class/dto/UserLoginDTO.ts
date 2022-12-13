export class UserLoginDTO{
  emailOrUsername: string;
  password: string;

  constructor(emailOrUsername: string, password: string) {
    this.emailOrUsername = emailOrUsername;
    this.password = password;
  }
}
