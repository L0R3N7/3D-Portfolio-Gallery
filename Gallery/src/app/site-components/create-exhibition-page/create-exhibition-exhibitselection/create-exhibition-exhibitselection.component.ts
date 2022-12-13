import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {GalleryService} from "../../../shared/gallery.service";
import {Exhibit} from "../../../shared/class/exhibit";
import {FileUploadOutput} from "../../../shared/file-upload-output";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {BlobService} from "../../../shared/blob.service";



@Component({
  selector: 'app-create-exhibition-exhibitselection',
  templateUrl: './create-exhibition-exhibitselection.component.html',
  styleUrls: ['./create-exhibition-exhibitselection.component.scss']
})
export class CreateExhibitionExhibitselectionComponent implements OnInit {

  @Output('changedExhibitList') changedExhibitlistEvent = new EventEmitter<Exhibit[]>();

  exhibitFile : FileUploadOutput | undefined;
  exhibitForm = new FormGroup({
    name: new FormControl('', Validators.required),
    desc : new FormControl('')
  });

  exhibitCollection : Exhibit[] = [];


  constructor(private gs: GalleryService, private bs: BlobService) {

  }

  ngOnInit(): void {
  }

  addExhibit() {
    this.bs.blobToBase64(this.exhibitFile!.blob).then(value => {
      this.exhibitCollection.push(new Exhibit(this.exhibitCollection.length, value, this.exhibitFile?.filetype ?? "non", this.exhibitForm.value.name ?? "unnamed", this.exhibitForm.value.desc ?? ""))
      this.changedExhibitlistEvent.emit(this.exhibitCollection);
    })
  }

  deleteExhibit($event: number) {
    if ($event == 0 && this.exhibitCollection.length == 1){
      this.exhibitCollection.shift();
    }else {
      this.exhibitCollection.splice($event, 1)
    }
    this.changedExhibitlistEvent.emit(this.exhibitCollection)
  }
}
