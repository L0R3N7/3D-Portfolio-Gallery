import {Component, Input, OnInit, Output} from '@angular/core';
import {Exhibition} from "../../shared/class/exhibition";
import {GalleryService} from "../../shared/gallery.service";

@Component({
  selector: 'app-exhibition-card',
  templateUrl: './exhibition-card.component.html',
  styleUrls: ['./exhibition-card.component.scss']
})
export class ExhibitionCardComponent implements OnInit {

  @Input() exhibition?: Exhibition;


  constructor() { }

  ngOnInit(): void {
  }

}
