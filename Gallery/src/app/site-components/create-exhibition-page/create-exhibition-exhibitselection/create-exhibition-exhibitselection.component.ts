import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {GalleryService} from "../../../shared/gallery.service";
import {Exhibit} from "../../../shared/class/exhibit";
import {FileUploadOutput} from "../../../shared/file-upload-output";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {BlobService} from "../../../shared/blob.service";
import {CreateExhibitionPageService} from "../create-exhibition-page.service";
import produce from "immer";


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


  constructor(private cs: CreateExhibitionPageService, private bs: BlobService) {
    this.cs.wizExhibits.subscribe(value => {
      this.exhibitCollection = value
    })
  }

  ngOnInit(): void {
  }

  addExhibit() {
    this.bs.blobToBase64(this.exhibitFile!.blob).then(value => {
      // Update Value in Service

      console.log("asdfasdf")
      let temp = this.cs.wizExhibits.value
      temp.push(new Exhibit(this.exhibitCollection.length, value, this.exhibitFile?.filetype ?? "non", this.exhibitForm.value.name ?? "unnamed", this.exhibitForm.value.desc ?? ""))
      this.cs.wizExhibits.next(temp)
      this.cs.saveExhibit()
      this.exhibitForm.controls['name'].setValue("")
      this.exhibitForm.controls['desc'].setValue("")
    })
  }

  deleteExhibit($event: number) {
    if ($event == 0 && this.exhibitCollection.length == 1){
      this.cs.wizExhibits.next(produce(this.cs.wizExhibits.value, draft => {draft.shift()}))
    }else {
      this.cs.wizExhibits.next(produce(this.cs.wizExhibits.value, draft => {draft.splice($event, 1)}))
    }
    this.cs.saveExhibit()
  }

  changeFile($event: FileUploadOutput) {
    this.exhibitFile = $event;
  }
}
