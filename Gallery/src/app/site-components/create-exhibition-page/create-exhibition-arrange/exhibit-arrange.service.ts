import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {PositionConfig} from "../../../shared/class/positionConfig";

@Injectable({
  providedIn: 'root'
})
export class ExhibitArrangeService {
  positionConfigList : PositionConfig[] = [];
  positionConfigListsubject = new BehaviorSubject(this.positionConfigList);

  constructor() { }

  getPositionConfigList() : BehaviorSubject<PositionConfig[]>{
    return this.positionConfigListsubject
  }

  setPositionConfigList(arr : PositionConfig[]){
    this.positionConfigListsubject.next(arr)
  }
}
