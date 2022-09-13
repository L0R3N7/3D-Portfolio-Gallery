import { Component, OnInit } from '@angular/core';
import {FileUploadOutput} from "../../../shared/file-upload-output";

@Component({
  selector: 'app-create-exhibition-arrange',
  templateUrl: './create-exhibition-arrange.component.html',
  styleUrls: ['./create-exhibition-arrange.component.scss']
})
export class CreateExhibitionArrangeComponent implements OnInit {

  fileUploadRes : FileUploadOutput | undefined;


  constructor() { }

  ngOnInit(): void {
  }

  print(event: FileUploadOutput) {
    this.fileUploadRes = event;
    console.log(event)
  }
}
