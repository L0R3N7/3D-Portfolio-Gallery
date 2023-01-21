import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Exhibition} from "../../shared/class/exhibition";

@Component({
  selector: 'app-exhibition-card',
  templateUrl: './exhibition-card.component.html',
  styleUrls: ['./exhibition-card.component.scss']
})
export class ExhibitionCardComponent implements OnInit {

  @Input('exhibtion') exhibition?: Exhibition;
  @Input('delete') isDeleteMode : boolean = false;
  @Output('delete') deleteEvent : EventEmitter<Exhibition> = new EventEmitter<Exhibition>();

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.exhibition)
  }

  onDelete() {
    this.deleteEvent.emit(this.exhibition) ;
  }
}
