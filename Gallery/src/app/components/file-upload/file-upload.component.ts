import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  @Input() media : string = '';

  constructor() {
  }

  ngOnInit(): void {
  }

}

