import { Injectable } from '@angular/core';
import {Exhibition} from "../../shared/class/exhibition";
import {Exhibit} from "../../shared/class/exhibit";
import {Room} from "../../shared/class/room";
import {BehaviorSubject} from "rxjs";
import {PositionConfig} from "../../shared/class/positionConfig";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CreateExhibitionPageService {

  tempExhibits : Exhibit[] = []
  positionConfigList: PositionConfig[] = [];

  wizPositionConfigList = new BehaviorSubject(this.positionConfigList)
  wizRoomId = new BehaviorSubject(-1)
  wizExhibits = new BehaviorSubject(this.tempExhibits)
  wizMetadata = new BehaviorSubject(new Metadata("", "", [], undefined))

  constructor() { }

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


