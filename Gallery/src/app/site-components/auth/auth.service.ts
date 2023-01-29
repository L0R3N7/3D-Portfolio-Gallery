import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserLoginDTO} from "../../shared/class/dto/UserLoginDTO";
import {Observable} from "rxjs";
import {UserNewDTO} from "../../shared/class/dto/UserNewDTO";
import {User} from "../../shared/class/user";
import {Exhibition} from "../../shared/class/exhibition";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private SERVER_URL = 'http://localhost:8080/api/'

  constructor(private http: HttpClient, private router: Router) {
  }

  getUser(userId: string) : Observable<User>{
    return this.http.get<User>(this.SERVER_URL + "users/" + userId)
  }

  login(user: UserLoginDTO): Observable<any> {
    return this.http.post(this.SERVER_URL + "users/login", user, {responseType: 'text'})
  }

  newUsers(userNewDTO: UserNewDTO): Observable<any> {
    return this.http.post(this.SERVER_URL + "users/new", userNewDTO)
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('id_token') && localStorage.getItem('expires_at')) {
      let temp = new Date().getTime()
      const exp = Number(localStorage.getItem('expires_at'))
      return temp < exp
    } else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem("user")
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    localStorage.removeItem('user_id')
  }

  setSaveJWT(value: any) {
    let decodedJWTPayload = JSON.parse(atob(value.split('.')[1]))
    localStorage.setItem("user", decodedJWTPayload.sub)
    localStorage.setItem('id_token', value)
    localStorage.setItem('expires_at', decodedJWTPayload.exp)
    localStorage.setItem('user_id', decodedJWTPayload.userid)
  }

  getUserExhibtions(userId: string) : Observable<Exhibition[]>{
    return this.http.get<Exhibition[]>(this.SERVER_URL + "exhibitions/getByUserId/" + userId)
  }
}
