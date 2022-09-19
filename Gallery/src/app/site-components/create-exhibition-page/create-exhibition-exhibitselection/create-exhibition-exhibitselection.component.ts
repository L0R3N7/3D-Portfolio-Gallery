import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {GalleryService} from "../../../shared/gallery.service";
import {Exhibit} from "../../../shared/class/exhibit";



@Component({
  selector: 'app-create-exhibition-exhibitselection',
  templateUrl: './create-exhibition-exhibitselection.component.html',
  styleUrls: ['./create-exhibition-exhibitselection.component.scss']
})
export class CreateExhibitionExhibitselectionComponent implements OnInit {

  exhibits: Exhibit[] = [];
  exhibit = { id: 0,
    thumbnail_url: '',
    title: '',
    room_id: '',
    description: ''};

  constructor(private gs: GalleryService) { }

  ngOnInit(): void {
  }

  addExhibit() {
    console.log(this.exhibit.title)
    this.gs.postExhibit(this.exhibit).subscribe(data => console.log(data))

  }
}
