import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {GalleryService} from "../../../shared/gallery.service";
import {Exhibit} from "../../../shared/class/exhibit";
import {FileUploadOutput} from "../../../shared/file-upload-output";
import {Subject} from "rxjs";
import {Cache} from "three";
import files = Cache.files;



@Component({
  selector: 'app-create-exhibition-exhibitselection',
  templateUrl: './create-exhibition-exhibitselection.component.html',
  styleUrls: ['./create-exhibition-exhibitselection.component.scss']
})
export class CreateExhibitionExhibitselectionComponent implements OnInit {

  cur_Exhibit = new Exhibit_Form();
  exhibit_Observer = new Subject<Exhibit_Form>();
  btn_disabled: boolean = false;

  constructor(private gs: GalleryService) {
    this.exhibit_Observer.subscribe(console.log)
  }


  ngOnInit(): void {
  }

  addExhibit() {
    console.log(this.cur_Exhibit)

    //console.log(this.exhibit.title)
    //this.gs.postExhibit(this.exhibit).subscribe(data => console.log(data))

  }

  updatedExhibitionForm() {
    if (this.cur_Exhibit.file && this.cur_Exhibit.title && this.cur_Exhibit.desc) {
      this.btn_disabled = true;
    }
    this.btn_disabled = false;

    console.log(this.btn_disabled)
  }
}

class Exhibit_Form{
  file : FileUploadOutput | undefined;
  title : string | undefined;
  desc : string | undefined;
}
