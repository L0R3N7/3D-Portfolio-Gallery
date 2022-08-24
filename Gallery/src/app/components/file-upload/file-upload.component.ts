import {Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  @Input() acceptedMediaTypes : string[] = ["image/png", "image/jpg", "image/jpeg"];



  constructor() {
  }

  ngOnInit(): void {
  }

}

