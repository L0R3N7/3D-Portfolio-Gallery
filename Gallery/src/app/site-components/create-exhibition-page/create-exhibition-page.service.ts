import { Injectable } from '@angular/core';
import {Exhibition} from "../../shared/class/exhibition";
import {Exhibit} from "../../shared/class/exhibit";
import {Room} from "../../shared/class/room";
import {BehaviorSubject} from "rxjs";
import {PositionConfig} from "../../shared/class/positionConfig";
import {HttpClient} from "@angular/common/http";
import {Meta} from "@angular/platform-browser";
import {GalleryService} from "../../shared/gallery.service";

@Injectable({
  providedIn: 'root'
})
export class CreateExhibitionPageService {

  METADATAKEY = "metadata"
  EXHIBITKEY = "exhibit"
  ROOMIKEY = "room"

  initialStateExhibits : Exhibit[] = []
  initialStatePositionConfigList: PositionConfig[] = []

  wizMetadata : BehaviorSubject<Metadata | undefined> = new BehaviorSubject<Metadata | undefined>(undefined)
  wizExhibits : BehaviorSubject<Exhibit[]> = new BehaviorSubject(this.initialStateExhibits)
  wizRoom : BehaviorSubject<Room | undefined> = new BehaviorSubject<Room | undefined>(undefined)
  wizPositionConfigList : BehaviorSubject<PositionConfig[]> = new BehaviorSubject(this.initialStatePositionConfigList)

  constructor(private galleryService: GalleryService) {
    this.checkSavedData()
  }


  checkSavedData() {
    if (sessionStorage.getItem(this.METADATAKEY)){
      this.wizMetadata.next(JSON.parse(sessionStorage.getItem(this.METADATAKEY)!!))
    }
    if (sessionStorage.getItem(this.EXHIBITKEY)){
      this.wizExhibits.next(JSON.parse(sessionStorage.getItem(this.EXHIBITKEY)!!))
    }
    if (sessionStorage.getItem(this.ROOMIKEY)){
      this.wizRoom.next(JSON.parse(sessionStorage.getItem(this.ROOMIKEY)!!))
    }
  }

  getSelectedState(): number{
    if (this.wizPositionConfigList.value.length > 0){
      return 3
    }else if (this.wizRoom.value){
      return 2
    }else if (this.wizExhibits.value.length > 0){
      return 1
    }
    return 0
  }

  saveMetaDate() {
    if(this.wizMetadata.value != undefined){
      sessionStorage.setItem(this.METADATAKEY, JSON.stringify(this.wizMetadata.value))
    }
  }

  saveExhibit() {
    if (this.wizExhibits.value.length > 0){
      sessionStorage.setItem(this.EXHIBITKEY, JSON.stringify(this.wizExhibits.value))
    }
  }

  saveRoom() {
    if (this.wizRoom.value != undefined){
      sessionStorage.setItem(this.ROOMIKEY, JSON.stringify(this.wizRoom.value))
    }
  }

  upload() {
    this.galleryService.postExhibition()
  }
}

export class Metadata{
  title: string
  desc?: string
  tagIds : number[] = []
  thumbnailUrl: string

  constructor(title: string, desc: string, tagIds: number[], thumbnailUrl: string) {
    this.title = title;
    this.desc = desc;
    this.tagIds = tagIds;
    this.thumbnailUrl = thumbnailUrl;
  }
}


