import {Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

export function requiresFileType(type: string[]) {
  return function (control: FormControl){
    const file = control.value;
    if (file) {
      const
    }
  }
}
export function requiresFileType(type: string){
  return requiresFileType([type]);
}

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  @Input() acceptedMediaTypes : string[] = ["image/png", "image/jpg", "image/jpeg"];
  uploadeFiles = new FormGroup({
    data : new FormControl(null, [Validators.required, requiresFileType()])
  })



  constructor() {
  }

  ngOnInit(): void {
  }

}

