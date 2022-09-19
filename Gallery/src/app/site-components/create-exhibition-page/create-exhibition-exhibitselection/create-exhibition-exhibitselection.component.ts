import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {GalleryService} from "../../../shared/gallery.service";
import {Exhibit} from "../../../shared/class/exhibit";
import {FileUploadOutput} from "../../../shared/file-upload-output";
import {Subject} from "rxjs";
import {Cache} from "three";
import { FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-create-exhibition-exhibitselection',
  templateUrl: './create-exhibition-exhibitselection.component.html',
  styleUrls: ['./create-exhibition-exhibitselection.component.scss']
})
export class CreateExhibitionExhibitselectionComponent implements OnInit {

  
  exhibitFile : FileUploadOutput | undefined; 
  exhibitForm = new FormGroup({
    name: new FormControl('', Validators.required),
    desc : new FormControl('')
  }); 
  
  exhibitCollection : Exhibit[] = []; 


  constructor(private gs: GalleryService) {
    
  }


  ngOnInit(): void {
  }

  addExhibit() {
    console.log(this.exhibitForm.value)
    console.log(this.exhibitFile)

    //blob
    this.exhibitCollection.push(new Exhibit(this.exhibitCollection.length, this.exhibitFile?.blob, this.exhibitFile?.filetype, this.exhibitForm.value.desc, this.exhibitForm.value.name))
  }

}
