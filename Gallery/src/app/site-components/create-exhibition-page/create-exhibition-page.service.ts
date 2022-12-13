import { Injectable } from '@angular/core';
import {Exhibition} from "../../shared/class/exhibition";
import {Exhibit} from "../../shared/class/exhibit";
import {Room} from "../../shared/class/room";
import {PositionConfig} from "../../shared/class/positionConfig";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CreateExhibitionPageService {
  inProgress: boolean = false;
  exhibtionDTO = new ExhibitionDto("", [], "", [], -1, [])
  exhibtionDTOBehaviorSubject = new BehaviorSubject(this.exhibtionDTO)

  constructor() { }
}

export class ExhibitionDto{
  name: string;
  catergories: number[];
  description: string;
  exhibits: Exhibit[];
  room: number;
  positionConfigList: PositionConfig[];

  constructor(name: string, catergories: number[], description: string, exhibits: Exhibit[], room: number, positionConfigList: PositionConfig[]) {
    this.name = name;
    this.catergories = catergories;
    this.description = description;
    this.exhibits = exhibits;
    this.room = room;
    this.positionConfigList = positionConfigList;
  }
}

