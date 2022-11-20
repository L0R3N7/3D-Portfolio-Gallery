import { Component, Input, OnInit } from '@angular/core';
import { FileUploadOutput} from "../../../shared/file-upload-output";
import { Exhibit } from 'src/app/shared/class/exhibit';
import { Theme } from 'src/app/shared/class/theme';
import { Room } from 'src/app/shared/class/room';
import { Position } from 'src/app/shared/class/position';
import {PositionConfig} from "../../../shared/class/positionConfig";
import {ExhibitArrangeService} from "./exhibit-arrange.service";

@Component({
  selector: 'app-create-exhibition-arrange',
  templateUrl: './create-exhibition-arrange.component.html',
  styleUrls: ['./create-exhibition-arrange.component.scss']
})
export class CreateExhibitionArrangeComponent implements OnInit {

  selectedId = -1;
  fileUploadRes : FileUploadOutput | undefined;

  position_arr : Position[] = [new Position(1, 2, 0, 0, false),
    new Position(2, 2, 1, 1, false),
    new Position(3, 2, 1, 0, false)]
  @Input('room') room : Room = new Room(2,  "small room", 0, "https://www.smb.museum/uploads/tx_smb/news/news_67970/Neues-Museum_Raum-Prolog_Achim_Kleuker_xl.jpg", "2.gltf", this.position_arr);
  @Input('ExhibitList') exhibitList : Exhibit[] = [new Exhibit(0, "cheese.gltf", "", "Käse", "Tolle Käser, nichtmal stinkig"),
    new Exhibit(1, "podest_01.gltf", "", "1.0 Podest", "The first desigend podest for this website")]
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

  //@Input('room') room : Room; //= new Room(0,  "small room", 0, "https://www.smb.museum/uploads/tx_smb/news/news_67970/Neues-Museum_Raum-Prolog_Achim_Kleuker_xl.jpg", "2.gltf", undefined)

  selected = "-1";
  position?: Position;

  constructor(
    private exhibitArrangeService : ExhibitArrangeService
  ) {
    // Load based on the availabe positions and the exhibitions a default object into the behavioursubject positionConfiger
    let temp_positionConfigList : PositionConfig[] = []
    for (var i = 0; i < this.exhibitList.length; i++){
      temp_positionConfigList[i] = new PositionConfig(-1, -1, this.exhibitList[i].model_url, "", "c", 1, undefined);
    }
    this.exhibitArrangeService.setPositionConfigList(temp_positionConfigList)

    this.exhibitArrangeService.getPositionConfigList().subscribe(values => {
      if (this.selectedId != -1){
        this.selected = this.exhibitArrangeService.getPositionConfigList().getValue()[this.selectedId].position_id.toString()
      }
    })
  }

  ngOnInit(): void {
  }

  print(event: FileUploadOutput) {
    this.fileUploadRes = event;
    console.log(event)
  }

  exhibitOption(id: number) {
    this.selectedId = id
    this.selected = this.exhibitArrangeService.getPositionConfigList().getValue()[id].position_id.toString()
  }

  containsInConfigArray(id: number) {
    console.log("hihi")
    return this.exhibitArrangeService.getPositionConfigList().getValue().find(value => value.position_id == id) != undefined;
  }

  isMaterialSelected(material_id: number) {
    return this.exhibitArrangeService.getPositionConfigList().getValue()[this.selectedId].material_id == material_id;
  }

  selectedMaterial(id: number) {
    this.exhibitArrangeService.getPositionConfigList().getValue()[this.selectedId].material_id = id;
  }
  selectedPosition() {
    var numSelected = Number(this.selected);

    if (numSelected != -1){
      let temp_SelectedPosition = this.exhibitArrangeService.getPositionConfigList().getValue();

      // Position swap if something had position_id already
      let temp_positionId = temp_SelectedPosition[this.selectedId].position_id
      let temp_id = temp_SelectedPosition.map(value => value.position_id).indexOf(numSelected)
      if (temp_id != -1){
        temp_SelectedPosition[temp_id].position_id = temp_positionId
      }
      console.log("here")

      temp_SelectedPosition[this.selectedId].position_id = numSelected;

      this.exhibitArrangeService.setPositionConfigList(temp_SelectedPosition)
    }
  }

  automaticalPlacement() {
    let temp_positionConfigList : PositionConfig[] = this.exhibitArrangeService.getPositionConfigList().getValue();
    for (var i = 0; i < temp_positionConfigList.length; i++){
      temp_positionConfigList[i].position_id = i+1;
    }
    this.exhibitArrangeService.setPositionConfigList(temp_positionConfigList)
  }

  isLoadedInThe3DScene(id: number){
    return this.exhibitArrangeService.getPositionConfigList().getValue()[id].position_id != -1
  }

  getAlignment(){
    return this.exhibitArrangeService.getPositionConfigList().getValue()[this.selectedId].alignment;
  }

  selecteAligment(value: string) {
    let temp_PositionConfig  = this.exhibitArrangeService.getPositionConfigList().getValue();
    temp_PositionConfig[this.selectedId].alignment = value
    this.exhibitArrangeService.setPositionConfigList(temp_PositionConfig)
  }
}
