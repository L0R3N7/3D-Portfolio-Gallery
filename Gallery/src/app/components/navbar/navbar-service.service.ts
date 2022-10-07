import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class NavbarServiceService {

  visible: boolean;
  white: boolean;
  loggedIn : boolean;

  constructor() {
    this.visible = false;
    this.white = false;
    this.loggedIn = false;
  }

  hide(){
    this.visible = false;
  }
  show(){
    this.visible = true;
  }
  changeWhite(){
    this.white = true;
  }
  toggle(){
    this.visible =!this.visible;
  }
}
