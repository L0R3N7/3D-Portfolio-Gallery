import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class NavbarServiceService {

  visible: boolean;
  white: boolean;

  constructor() {
    this.visible = false;
    this.white = false;
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
