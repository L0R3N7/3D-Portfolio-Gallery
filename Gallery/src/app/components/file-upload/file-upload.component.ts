import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FileUploadOutput} from "../../shared/file-upload-output";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  @Input('acceptedMediaTypes') acceptedMediaTypes : string[] = ["image/png", "image/jpg", "image/jpeg"];
  @Input('fileSize') fileSize : number = 111000;
  @Output() fileOutput = new EventEmitter<FileUploadOutput>();

  constructor() {
  }

  ngOnInit(): void {
  }



  fileChange(event: Event) {
    this.inputCheck(event)

    var extension : string = "";

    //@ts-ignore
    console.log(event.target.files[0]);

    // @ts-ignore
    if (event.target.files && event.target.files[0]){
      var reader = new FileReader();
      // @ts-ignore
      extension = event.target.files[0].name.match(/\.(\w+)$/)[0].substring(1).toLowerCase();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        console.log(e)
        //@ts-ignore
        this.fileOutput.emit(new FileUploadOutput(e.target.result, extension));
      }
      // @ts-ignore
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  inputCheck(event: Event){
    var isCorrectInput = true;

    // checks if selected file has the right file type
    if (this.acceptedMediaTypes){
      var regex = new RegExp(/(\w+)(?=\|)/g)
      var arrExtension = this.acceptedMediaTypes.join('|').concat('|').match(regex) ?? []
      console.log(arrExtension)
      regex = new RegExp(`/\.(${arrExtension.join('|')})/`)
      console.log(regex)
      //@ts-ignore
      if (!this.acceptedMediaTypes.includes(event.target.files[0].type) || event.target.files[0].name.match(regex)){
        alert("We currently doesn't support this filetype")
        isCorrectInput = false;
      }
    }

    // checks if selected file has the right file size
    if (this.fileSize){
      //@ts-ignore
      if (event.target.files[0].size > this.fileSize){
        alert("The file exceeds the size of the limit "+this.fileSize+"b")
        isCorrectInput = false;
      }
    }

    return isCorrectInput;
  }
}

