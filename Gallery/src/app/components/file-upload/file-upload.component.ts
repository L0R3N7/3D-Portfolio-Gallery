import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  @Input() acceptedMediaTypes : string[] = ["image/png", "image/jpg", "image/jpeg"];
  @Output() blob = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  fileChange(event: Event) {
    //@ts-ignore
    console.log(event.target.files[0]);

    // @ts-ignore
    if (event.target.files && event.target.files[0]){
      var reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        console.log(e)
        //@ts-ignore
        this.blob.emit(e.target.result);
      }
      // @ts-ignore
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}

