import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FileUploadOutput} from "../../shared/file-upload-output";
import {GalleryService} from "../../shared/gallery.service";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  @Input('acceptedMediaTypes') acceptedMediaTypes : string = "";
  @Input('fileSize') fileSize : number = 9999999999999;
  @Output() fileOutput = new EventEmitter<FileUploadOutput>();

  constructor(public galeryService : GalleryService) {
  }

  fileChange(event: Event) {
    if(!this.inputCheck(event)){
      console.error("unsupported media type")
      return;
    }

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
    //@ts-ignore
    if (!event.target.files[0] || !event.target.files[0].size){
      return false;
    }

    // checks if selected file has the right file type
    if (this.acceptedMediaTypes){
      var regex = new RegExp(/(\w+)(?=\|)/g)
      // @ts-ignore
      var arrExtension = this.galeryService.getSupportedFiletypes(this.acceptedMediaTypes).join('|').concat('|').match(regex) ?? []
      console.log(arrExtension)
      regex = new RegExp(`/\.(${arrExtension.join('|')})/`)
      //@ts-ignore
      if (!this.galeryService.getSupportedFiletypes(this.acceptedMediaTypes).includes(event.target.files[0].type) || event.target.files[0].name.match(regex)){
        alert("We currently doesn't support this filetype")
        return false;
      }
    }

    // checks if selected file has the right file size
    if (this.fileSize){
      //@ts-ignore
      if (event.target.files[0].size > this.fileSize){
        alert("The file exceeds the size of the limit "+this.fileSize+"b")
        return false;
      }
    }

    return true;
  }
}

