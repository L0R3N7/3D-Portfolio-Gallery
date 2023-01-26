import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {GalleryService} from "./gallery.service";

@Injectable({
  providedIn: 'root'
})
export class ExhibitDownloadService {
  exhibits: StringArray = {} as StringArray

  constructor(private gs: GalleryService) {
  }

  /*

  clear() {
    this.exhibits = {} as StringArray
  }

  get(exhibit_url: string): Blob{
      if (this.exhibits[exhibit_url] == undefined){
        this.download(exhibit_url)
      }
      return this.exhibits[exhibit_url]
  }

  download(exhibit_url: string): Blob{
    this.gs.getFile(exhibit_url).subscribe(value => {
      this.exhibits[exhibit_url] = value
      return value
    })
  }

  available(exhibit_url: string){

  }*/


}

interface StringArray {
  [index: string]: Blob;
}
