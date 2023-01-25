import { Component, Input, OnInit } from '@angular/core';
import { FileUploadOutput} from "../../../shared/file-upload-output";
import { Exhibit } from 'src/app/shared/class/exhibit';
import { Theme } from 'src/app/shared/class/theme';
import { Room } from 'src/app/shared/class/room';
import {PositionConfig} from "../../../shared/class/positionConfig";
import {CreateExhibitionPageService} from "../create-exhibition-page.service";
import produce from "immer";

@Component({
  selector: 'app-create-exhibition-arrange',
  templateUrl: './create-exhibition-arrange.component.html',
  styleUrls: ['./create-exhibition-arrange.component.scss']
})
export class CreateExhibitionArrangeComponent implements OnInit {

  selectedId = -1;
  selected = "-1";
  fileUploadRes : FileUploadOutput | undefined;
  @Input('MaterialList') materialList : Theme[] = [
    new Theme(1, "https://cdn.shopify.com/s/files/1/0561/2168/8256/products/trumerholz-gehackte-larche-wohnwand_695x695.jpg?v=1660934418", "", 0, "",""),
    new Theme(2, "https://cdn.shopify.com/s/files/1/0561/2168/8256/products/trumerholz-gehackte-larche-wohnwand_695x695.jpg?v=1660934418", "", 0, "",""),
    new Theme(3, "https://cdn.shopify.com/s/files/1/0561/2168/8256/products/trumerholz-gehackte-larche-wohnwand_695x695.jpg?v=1660934418", "", 0, "",""),
    new Theme(4, "https://cdn.shopify.com/s/files/1/0561/2168/8256/products/trumerholz-gehackte-larche-wohnwand_695x695.jpg?v=1660934418", "", 0, "",""),
    new Theme(5, "https://cdn.shopify.com/s/files/1/0561/2168/8256/products/trumerholz-gehackte-larche-wohnwand_695x695.jpg?v=1660934418", "", 0, "",""),
    new Theme(6, "https://cdn.shopify.com/s/files/1/0561/2168/8256/products/trumerholz-gehackte-larche-wohnwand_695x695.jpg?v=1660934418", "", 0, "",""),
    new Theme(7, "https://cdn.shopify.com/s/files/1/0561/2168/8256/products/trumerholz-gehackte-larche-wohnwand_695x695.jpg?v=1660934418", "", 0, "",""),
    new Theme(8, "https://cdn.shopify.com/s/files/1/0561/2168/8256/products/trumerholz-gehackte-larche-wohnwand_695x695.jpg?v=1660934418", "", 0, "",""),
    new Theme(9, "https://cdn.shopify.com/s/files/1/0561/2168/8256/products/trumerholz-gehackte-larche-wohnwand_695x695.jpg?v=1660934418", "", 0, "",""),
    new Theme(10, "https://cdn.shopify.com/s/files/1/0561/2168/8256/products/trumerholz-gehackte-larche-wohnwand_695x695.jpg?v=1660934418", "", 0, "",""),
    new Theme(11, "https://cdn.shopify.com/s/files/1/0561/2168/8256/products/trumerholz-gehackte-larche-wohnwand_695x695.jpg?v=1660934418", "", 0, "",""),
    new Theme(12, "https://cdn.shopify.com/s/files/1/0561/2168/8256/products/trumerholz-gehackte-larche-wohnwand_695x695.jpg?v=1660934418", "", 0, "",""),
    new Theme(13, "https://cdn.shopify.com/s/files/1/0561/2168/8256/products/trumerholz-gehackte-larche-wohnwand_695x695.jpg?v=1660934418", "", 0, "",""),
    new Theme(14, "https://cdn.shopify.com/s/files/1/0561/2168/8256/products/trumerholz-gehackte-larche-wohnwand_695x695.jpg?v=1660934418", "", 0, "",""),
    new Theme(15, "https://cdn.shopify.com/s/files/1/0561/2168/8256/products/trumerholz-gehackte-larche-wohnwand_695x695.jpg?v=1660934418", "", 0, "","")
  ]

  exhibitList: Exhibit[] = []
  room: Room | undefined


  constructor(
    private createService : CreateExhibitionPageService
  ) {

    createService.wizExhibits.subscribe(value => {
      let tempPositionConfigList: PositionConfig[] = []

      this.exhibitList = value
      for (let i = 0; i < value.length; i++){
        tempPositionConfigList.push(new PositionConfig(-1, -1, value[i].model_url, "", "c", 4, undefined, value[i].desc, value[i].title))
      }
      createService.wizPositionConfigList.next(tempPositionConfigList)
    })

    createService.wizRoom.subscribe(value => {
      this.room = value
    })

    this.createService.wizPositionConfigList.subscribe(values => {
      if (this.selectedId != -1){
        this.selected = values[this.selectedId].position_id.toString()
      }
    })
  }

  ngOnInit(): void {
  }

  exhibitOption(id: number) {
    this.selectedId = id
    this.selected = this.createService.wizPositionConfigList.getValue()[id].position_id.toString()
  }

  containsInConfigArray(id: number) {
    return this.createService.wizPositionConfigList.getValue().find(value => value.position_id == id) != undefined;
  }

  isMaterialSelected(material_id: number) {
    return this.createService.wizPositionConfigList.getValue()[this.selectedId].material_id == material_id;
  }

  selectedMaterial(id: number) {
    this.createService.wizPositionConfigList.next(produce(this.createService.wizPositionConfigList.getValue(), draft => {
      draft[this.selectedId].material_id = id
    }))
  }
  selectedPosition() {
    const numSelected = Number(this.selected);

    if (numSelected != -1){
      let temp_SelectedPosition = this.createService.wizPositionConfigList.getValue();

      // Position swap if something had position_id already
      let temp_positionId = temp_SelectedPosition[this.selectedId].position_id
      let temp_id = temp_SelectedPosition.map(value => value.position_id).indexOf(numSelected)
      if (temp_id != -1){
        temp_SelectedPosition[temp_id].position_id = temp_positionId
      }

      temp_SelectedPosition[this.selectedId].position_id = numSelected;

      this.createService.wizPositionConfigList.next(temp_SelectedPosition)
    }
  }

  automaticalPlacement() {
    let temp_positionConfigList : PositionConfig[] = this.createService.wizPositionConfigList.getValue();
    for (var i = 0; i < temp_positionConfigList.length; i++){
      temp_positionConfigList[i].position_id = i+1;
    }
    this.createService.wizPositionConfigList.next(temp_positionConfigList)
  }

  isLoadedInThe3DScene(id: number){
    return this.createService.wizPositionConfigList.getValue()[id].position_id != -1
  }

  getAlignment(){
    return this.createService.wizPositionConfigList.getValue()[this.selectedId].alignment;
  }

  selecteAligment(value: string) {
    let temp_PositionConfig  = this.createService.wizPositionConfigList.getValue();
    temp_PositionConfig[this.selectedId].alignment = value
    this.createService.wizPositionConfigList.next(temp_PositionConfig)
  }

  setObjectScale(value: string) {
    let temp_PositionConfig = this.createService.wizPositionConfigList.getValue();
    //console.log("Scaling: "+value) Number(value)
    temp_PositionConfig[this.selectedId].scale_factor = + value;
    this.createService.wizPositionConfigList.next(temp_PositionConfig)
  }

  getObjectScale() : string {
    return ""+this.createService.wizPositionConfigList.getValue()[this.selectedId].scale_factor;
  }
}
