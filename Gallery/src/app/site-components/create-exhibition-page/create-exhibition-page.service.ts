import { Injectable } from '@angular/core';
import {Exhibition} from "../../shared/class/exhibition";
import {Exhibit} from "../../shared/class/exhibit";
import {Room} from "../../shared/class/room";
import {BehaviorSubject} from "rxjs";
import {PositionConfig} from "../../shared/class/positionConfig";
import {HttpClient} from "@angular/common/http";
import {Meta} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class CreateExhibitionPageService {

  METADATAKEY = "metadata"

  initialStateExhibits : Exhibit[] = []
  initialStatePositionConfigList: PositionConfig[] = []

  wizMetadata : BehaviorSubject<Metadata | undefined> = new BehaviorSubject<Metadata | undefined>(undefined)
  wizExhibits : BehaviorSubject<Exhibit[]> = new BehaviorSubject(this.initialStateExhibits)
  wizRoomId : BehaviorSubject<number | undefined> = new BehaviorSubject<number | undefined>(undefined)
  wizPositionConfigList : BehaviorSubject<PositionConfig[]> = new BehaviorSubject(this.initialStatePositionConfigList)

  constructor() {
    this.checkSavedData()
  }


  checkSavedData() {
    if (sessionStorage.getItem(this.METADATAKEY)){
      this.wizMetadata.next(JSON.parse(sessionStorage.getItem(this.METADATAKEY)!!))
    }
  }

  getSelectedState(): number{
    if (this.wizPositionConfigList.value.length > 0){
      return 3
    }else if (this.wizRoomId.value){
      return 2
    }else if (this.wizExhibits.value.length > 0){
      return 1
    }
    return 0
  }

  saveMetaDate() {
    console.log("saving data")
    if(this.wizMetadata.value != undefined){
      sessionStorage.setItem(this.METADATAKEY, JSON.stringify(this.wizMetadata.value))
    }
  }
}

export class Metadata{
  title: string
  desc?: string
  tagIds : number[] = []
  thumbnail?: File

  constructor(title: string, desc: string, tagIds: number[], thumbnail: File | undefined) {
    this.title = title;
    this.desc = desc;
    this.tagIds = tagIds;
    this.thumbnail = thumbnail;
  }
}


