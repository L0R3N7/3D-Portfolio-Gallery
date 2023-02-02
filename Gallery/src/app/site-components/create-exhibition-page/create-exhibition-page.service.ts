import { Injectable } from '@angular/core';
import {Exhibition} from "../../shared/class/exhibition";
import {Exhibit} from "../../shared/class/exhibit";
import {Room} from "../../shared/class/room";
import {BehaviorSubject} from "rxjs";
import {PositionConfig} from "../../shared/class/positionConfig";
import {HttpClient} from "@angular/common/http";
import {Meta} from "@angular/platform-browser";
import {GalleryService} from "../../shared/gallery.service";
import {AddExhibitDTO, AddExhibitionDTO} from "../../shared/class/dto/addExhibitionDTO";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CreateExhibitionPageService {

  isExhibitionUploadable = false

  METADATAKEY = "metadata"
  EXHIBITKEY = "exhibit"
  ROOMIKEY = "room"

  initialStateExhibits : Exhibit[] = []
  initialStatePositionConfigList: PositionConfig[] = []

  wizMetadata : BehaviorSubject<Metadata | undefined> = new BehaviorSubject<Metadata | undefined>(undefined)
  wizExhibits : BehaviorSubject<Exhibit[]> = new BehaviorSubject(this.initialStateExhibits)
  wizRoom : BehaviorSubject<Room | undefined> = new BehaviorSubject<Room | undefined>(undefined)
  wizPositionConfigList : BehaviorSubject<PositionConfig[]> = new BehaviorSubject(this.initialStatePositionConfigList)

  constructor(private galleryService: GalleryService, private authService: AuthService, private route: Router) {
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
    if (this.uploadValid()){
      this.postExhibition()
    }
  }

  uploadValid(): Boolean {
    console.log("Upload Valid")

    return this.wizMetadata.value != undefined
      && this.wizRoom.value != undefined
      && this.wizPositionConfigList.value.length > 0
      && this.wizExhibits.value.length > 0
      && localStorage.getItem('user_id') != undefined
  }

  private  postExhibition(){
    const tempMeta = this.wizMetadata.value
    const tempRoom = this.wizRoom.value
    const tempPositionConfig = this.wizPositionConfigList.value
    const tempExhibitits = this.wizExhibits.value
    const userId = localStorage.getItem('user_id')

    if(tempMeta != undefined &&
      tempRoom != undefined &&
      tempPositionConfig != undefined &&
      tempExhibitits != undefined &&
      userId != undefined){

      const tempAddExhibit: Array<AddExhibitDTO | undefined> = tempPositionConfig.filter(value => {
        return value.position_id != -1
      }).map(value => {
        const exhibit = tempExhibitits.find(value1 => {
          return value1.model_url == value.exhibit_url
        })

        if (exhibit != undefined){
          return new AddExhibitDTO(exhibit.data_type, exhibit.desc, exhibit.title, exhibit.model_url, value.scale_factor, value.alignment, value.material_id, value.position_id)
        }
        return
      })


      const tempAddExhibition = new AddExhibitionDTO(tempMeta.title,
        tempMeta.desc ?? '', tempRoom.id, parseInt(userId), tempMeta.tagIds, tempAddExhibit, tempMeta.thumbnailUrl)

      console.log(tempAddExhibition)
      this.galleryService.postExhibition(tempAddExhibition).subscribe({
        next: _ => {
          this.clear()
          this.route.navigate(["/home"])
        },
        error: err => {
          console.error("Error at Exhibition Post", err)
        }
      })}
  }

  private clear() {
    sessionStorage.removeItem(this.ROOMIKEY)
    sessionStorage.removeItem(this.METADATAKEY)
    sessionStorage.removeItem(this.EXHIBITKEY)
    this.wizExhibits.next([])
    this.wizRoom.next(undefined)
    this.wizMetadata.next(undefined)
    this.wizPositionConfigList.next([])
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


