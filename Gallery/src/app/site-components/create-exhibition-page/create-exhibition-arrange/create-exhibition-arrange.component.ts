import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { FileUploadOutput} from "../../../shared/file-upload-output";
import { Exhibit } from 'src/app/shared/class/exhibit';
import { Material } from 'three';
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
  positionConfigList : PositionConfig[] = [];

  position_arr : Position[] = [new Position(1, 2, 0, 0, false),
    new Position(2, 2, 1, 1, false),
    new Position(3, 2, 1, 0, false)]
  @Input('room') room : Room = new Room(2,  "small room", 0, "https://www.smb.museum/uploads/tx_smb/news/news_67970/Neues-Museum_Raum-Prolog_Achim_Kleuker_xl.jpg", "2.gltf", this.position_arr);
  @Input('ExhibitList') exhibitList : Exhibit[] = [new Exhibit(0, "cheese.gltf", "", "Käse", "Tolle Käser, nichtmal stinkig")]
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
    for (var i = 0; i < this.exhibitList.length; i++){
      this.positionConfigList[i] = new PositionConfig(-1, -1, this.exhibitList[i].model_url, "", undefined);
    }
  }

  ngOnInit(): void {
  }

  print(event: FileUploadOutput) {
    this.fileUploadRes = event;
    console.log(event)
  }

  exhibitOption(id: number) {
    this.selectedId = id;
  }

  containsInConfigArray(id: number) {
    console.log("hihi")
    return this.positionConfigList.find(value => value.position_id == id) != undefined;
  }

  isMaterialSelected(material_id: number) {
    return this.positionConfigList[this.selectedId].material_id == material_id;
  }

  selectedMaterial(id: number) {
    this.positionConfigList[this.selectedId].material_id = id;
  }
  selectedPosition() {
    var numSelected = Number(this.selected);

    //TODO
    if (numSelected != -1){
      this.positionConfigList[this.selectedId].position_id =  numSelected;
      console.log(this.positionConfigList)
      this.exhibitArrangeService.setPositionConfigList(this.positionConfigList)
    }
    /*
    if (
      numSelected != -1){
      var temp = this.positionConfigList.find(value => value.position_id = numSelected);
      if (this.containsInConfigArray(numSelected)){
        this.positionConfigList.find(value => value.position_id = numSelected).position_id = this.positionConfigList[this.selectedId].position_id;
        this.positionConfigList[this.selectedId].position_id = numSelected;
      }else{
        this.positionConfigList[this.selectedId].position_id =  numSelected;
      }
    }
    */
    // Zu müde
  }

  automaticalPlacement() {
    for (var i = 0; i < this.positionConfigList.length; i++){
      this.positionConfigList[i].position_id = i+1;
    }
    this.exhibitArrangeService.setPositionConfigList(this.positionConfigList)
  }
}
