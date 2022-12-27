import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserLoginDTO} from "../../shared/class/dto/UserLoginDTO";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private SERVER_URL = 'http://localhost:8080/api/users/'

  constructor(private http: HttpClient, private router: Router) {}

  login(user: UserLoginDTO): Observable<any> {
    return this.http.post(this.SERVER_URL + "login", user, {responseType: 'text'})
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('id_token') && localStorage.getItem('expires_at')){
      let temp = new Date().getTime()
      const exp = Number(localStorage.getItem('expires_at'))
      return temp < exp
    }else{
      return false;
    }
  }

  logout(){
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
  }
}


