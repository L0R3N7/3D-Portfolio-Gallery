import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FileUploadOutput} from "../../shared/file-upload-output";
import {GalleryService} from "../../shared/gallery.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  @Input('acceptedMediaTypes') acceptedMediaTypes : string = "";
  @Input('fileSize') fileSize : number = 9999999999999;
  @Input('multipleFilesAllowed') multipleFilesAllowed = false;
  @Output() fileOutput = new EventEmitter<FileUploadOutput>();
  progress = 0;
  message = ""
  selectedFile?: File;


  constructor(public galleryService : GalleryService) {
  }

  fileChange(event: Event) {
    // @ts-ignore
    let file : File = event.target.files[0]


    if(!this.inputCheck(file)){
      alert("unsupported media type: "+this.message)
      return;
    }

    this.selectedFile = file

    this.upload(file)
  }

  inputCheck(file: File){
    this.message = ""


    if (file == undefined){
      this.message += "File is null\n"
      return false;
    }
    // checks if selected file has the right file type
    if (this.acceptedMediaTypes){
      var regex = new RegExp(/(\w+)(?=\|)/g)
      var arrExtension = this.galleryService?.getSupportedFiletypes(this.acceptedMediaTypes)?.join('|').concat('|').match(regex) ?? []
      regex = new RegExp(`/\.(${arrExtension.join('|')})/`)
      if (!this.galleryService?.getSupportedFiletypes(this.acceptedMediaTypes)?.includes(file.type) || file.name.match(regex)){
        this.message += "For this application this media type is wrong\n"
        return false;
      }
    }
    // checks if selected file has the right file size
    if (this.fileSize){
      if (file.size > this.fileSize){
        this.message += "The file exceeds the size of the limit "+this.fileSize+"bits\n"
        return false;
      }
    }
    return true;
  }

  upload(file: File){
    console.log("Upload process begins")

    this.progress = 0
    const output = file.name.replace(/[\[\]']+/g,'');
    const fd = new FormData();

    fd.append('uploadedFile', file, output);

    this.galleryService.postFile(fd).subscribe({
      next: (event: any) => {

        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        }else if (event instanceof HttpResponse) {
          this.message = event.body;

          const serverFileName : string = this.message.split("/").pop() ?? "";
          if (serverFileName.length > 0){
            const fuo = new FileUploadOutput(serverFileName,
              serverFileName.split('.')[1].toLowerCase());
            this.fileOutput.emit(fuo)
          }
        }
      }
    })
  }
}

