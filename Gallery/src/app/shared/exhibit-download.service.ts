import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {GalleryService} from "./gallery.service";

@Injectable({
  providedIn: 'root'
})
export class ExhibitDownloadService {
  /*
  exhibits: StringArray = {} as StringArray

  constructor(private gs: GalleryService) {
  }



  clear() {
    this.exhibits = {} as StringArray
  }

  async get(exhibit_url: string): Promise<Blob>{
      if (this.exhibits[exhibit_url] == undefined){
        const blob = await this.download(exhibit_url);

        if (!blob)
          return Promise.reject();
      }
      return this.exhibits[exhibit_url]

    // Maybe catch
  }

  async download(exhibit_url: string): Promise<Blob | undefined>{
    this.gs.getFile(exhibit_url).subscribe(value => {
      this.exhibits[exhibit_url] = value
      return value
    })
    return undefined
  }

  available(exhibit_url: string){

  }*/
}

interface StringArray {
  [index: string]: Blob;
}
