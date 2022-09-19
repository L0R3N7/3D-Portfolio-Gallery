import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Exhibit} from "../../shared/class/exhibit";

@Component({
  selector: 'app-exhibit-card',
  templateUrl: './exhibit-card.component.html',
  styleUrls: ['./exhibit-card.component.scss']
})
export class ExhibitCardComponent implements OnInit {

  @Input('exhibit') exhibit : Exhibit = new Exhibit(0, "", "", "statue", "");
  @Input('count') count : number = 0;
  @Output('delete') deleteEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  delete() {
    this.deleteEvent.emit(this.count);
  }
}
