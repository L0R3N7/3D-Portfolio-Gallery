import { Component, Input, OnInit } from '@angular/core';
import { FileUploadOutput} from "../../../shared/class/file-upload-output";
import { Exhibit } from 'src/app/shared/class/exhibit';
import { Theme } from 'src/app/shared/class/theme';
import { Room } from 'src/app/shared/class/room';
import {PositionConfig} from "../../../shared/class/positionConfig";
import {CreateExhibitionPageService} from "../create-exhibition-page.service";
import produce from "immer";
import {Position} from "../../../shared/class/position";
import {GalleryService} from "../../../shared/gallery.service";

@Component({
  selector: 'app-create-exhibition-arrange',
  templateUrl: './create-exhibition-arrange.component.html',
  styleUrls: ['./create-exhibition-arrange.component.scss']
})
export class CreateExhibitionArrangeComponent {

  selectedArrayPosition = -1;
  selectedId = "-1";
  filteredPosition : Position[] = []

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
    private createService : CreateExhibitionPageService,
    private galleryService: GalleryService
  ) {
    createService.wizRoom.subscribe(room => {
      this.room = room
      createService.wizExhibits.subscribe(exhibitList => {
        this.exhibitList = exhibitList
        createService.wizPositionConfigList.next(this.resetPositionConfig(exhibitList))
      })
    })

    this.createService.wizPositionConfigList.subscribe(positionConfigList => {
      if (this.selectedArrayPosition != -1){
        this.selectedId = positionConfigList[this.selectedArrayPosition].position_id.toString()
      }
    })
  }

  resetPositionConfig(exhibitList: Exhibit[]): PositionConfig[]{
    const tempPositionConfigList: PositionConfig[] = []
    for (let i = 0; i < exhibitList.length; i++){
      tempPositionConfigList.push(new PositionConfig(-1, 1, exhibitList[i].model_url, exhibitList[i].data_type, "c", 4, undefined, exhibitList[i].desc, exhibitList[i].title))
    }
    return tempPositionConfigList;
  }

  exhibitOption(id: number) {
    this.selectedArrayPosition = id
    this.filteredPosition = this.getFilteredRoomPositionsByDataType(this.exhibitList[this.selectedArrayPosition].data_type)
    this.selectedId = this.createService.wizPositionConfigList.getValue()[id].position_id.toString()
  }

  isMaterialSelected(material_id: number) {
    return this.createService.wizPositionConfigList.getValue()[this.selectedArrayPosition].material_id == material_id;
  }

  selectedMaterial(id: number) {
    this.createService.wizPositionConfigList.next(produce(this.createService.wizPositionConfigList.getValue(), draft => {
      draft[this.selectedArrayPosition].material_id = id
    }))
  }
  selectedPosition() {
    const numSelected = Number(this.selectedId);

    if (numSelected != -1){
      let temp_SelectedPosition = this.createService.wizPositionConfigList.getValue();

      // Position swap if something had position_id already
      let temp_positionId = temp_SelectedPosition[this.selectedArrayPosition].position_id
      let temp_id = temp_SelectedPosition.map(value => value.position_id).indexOf(numSelected)
      if (temp_id != -1){
        temp_SelectedPosition[temp_id].position_id = temp_positionId
      }

      temp_SelectedPosition[this.selectedArrayPosition].position_id = numSelected;

      this.createService.wizPositionConfigList.next(temp_SelectedPosition)
    }
  }

  automaticallyPlacement() {
    let temp_positionConfigList : PositionConfig[] = this.createService.wizPositionConfigList.getValue();
    let temp_position = this.room?.positions

    temp_position?.forEach((position) => {
      const positionConfigIndex = temp_positionConfigList.findIndex(positionConfig => {
        if (positionConfig.position_id != -1){
          return false
        }
        const category = this.galleryService.getClassificationPerType(positionConfig.exhibit_type)
        return (category == '3d' && !position.is_wall) || (category != '3d' && position.is_wall)
      })

      if (positionConfigIndex != -1){
        temp_positionConfigList[positionConfigIndex].position_id = position.id
      }
    })

    this.createService.wizPositionConfigList.next(temp_positionConfigList)
  }

  isLoadedInThe3DScene(id: number){
    return this.createService.wizPositionConfigList.getValue()[id].position_id != -1
  }

  getAlignment(){
    return this.createService.wizPositionConfigList.getValue()[this.selectedArrayPosition].alignment;
  }

  selecteAligment(value: string) {
    let temp_PositionConfig  = this.createService.wizPositionConfigList.getValue();
    temp_PositionConfig[this.selectedArrayPosition].alignment = value
    this.createService.wizPositionConfigList.next(temp_PositionConfig)
  }

  setObjectScale(value: string) {
    let temp_PositionConfig = this.createService.wizPositionConfigList.getValue();
    //console.log("Scaling: "+value) Number(value)
    temp_PositionConfig[this.selectedArrayPosition].scale_factor = + value;
    this.createService.wizPositionConfigList.next(temp_PositionConfig)
  }

  getObjectScale() : string {
    return ""+this.createService.wizPositionConfigList.getValue()[this.selectedArrayPosition].scale_factor;
  }


  getFilteredRoomPositionsByWall(isWall: boolean): Position[]{
    return this.room?.positions.filter(position => {return position.is_wall == isWall}) ?? []
  }

  getFilteredRoomPositionsByDataType(data_type: string) {
    const category = this.galleryService.getFileTypeCategoryByFileType(data_type)
    const filteredPosition = this.getFilteredRoomPositionsByWall(category != '3d')
    console.log("Filtering ", this.room?.positions, filteredPosition, category)
    return filteredPosition
  }
}

