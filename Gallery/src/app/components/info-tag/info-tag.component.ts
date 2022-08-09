import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-tag',
  templateUrl: './info-tag.component.html',
  styleUrls: ['./info-tag.component.scss']
})
export class InfoTagComponent implements OnInit {

  visible : boolean;

  constructor() {
    this.visible = false;
  }

  ngOnInit(): void {
  }

  toggleVisiblity(){
    this.visible = !this.visible;
  }
}
