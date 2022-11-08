import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { FileUploadOutput} from "../../../shared/file-upload-output";
import { Exhibit } from 'src/app/shared/class/exhibit';
import { Material } from 'three';
import { Theme } from 'src/app/shared/class/theme';
import { Room } from 'src/app/shared/class/room';
import { Position } from 'src/app/shared/class/position';

@Component({
  selector: 'app-create-exhibition-arrange',
  templateUrl: './create-exhibition-arrange.component.html',
  styleUrls: ['./create-exhibition-arrange.component.scss']
})
export class CreateExhibitionArrangeComponent implements OnInit {

  fileUploadRes : FileUploadOutput | undefined;
  @Input('ExhibitList') exhibitList : Exhibit[] = [new Exhibit(0, "", "", "Vase", "Tolle Vase")]
  @Input('MaterialList') materialList : Theme[] = [
    new Theme(0, "https://cdn.shopify.com/s/files/1/0561/2168/8256/products/trumerholz-gehackte-larche-wohnwand_695x695.jpg?v=1660934418", "", 0, "",""),
    new Theme(0, "https://cdn.shopify.com/s/files/1/0561/2168/8256/products/trumerholz-gehackte-larche-wohnwand_695x695.jpg?v=1660934418", "", 0, "",""),
    new Theme(0, "https://cdn.shopify.com/s/files/1/0561/2168/8256/products/trumerholz-gehackte-larche-wohnwand_695x695.jpg?v=1660934418", "", 0, "",""),
    new Theme(0, "https://cdn.shopify.com/s/files/1/0561/2168/8256/products/trumerholz-gehackte-larche-wohnwand_695x695.jpg?v=1660934418", "", 0, "",""),
    new Theme(0, "https://cdn.shopify.com/s/files/1/0561/2168/8256/products/trumerholz-gehackte-larche-wohnwand_695x695.jpg?v=1660934418", "", 0, "",""),
    new Theme(0, "https://cdn.shopify.com/s/files/1/0561/2168/8256/products/trumerholz-gehackte-larche-wohnwand_695x695.jpg?v=1660934418", "", 0, "",""),
    new Theme(0, "https://cdn.shopify.com/s/files/1/0561/2168/8256/products/trumerholz-gehackte-larche-wohnwand_695x695.jpg?v=1660934418", "", 0, "",""),
    new Theme(0, "https://cdn.shopify.com/s/files/1/0561/2168/8256/products/trumerholz-gehackte-larche-wohnwand_695x695.jpg?v=1660934418", "", 0, "",""),
    new Theme(0, "https://cdn.shopify.com/s/files/1/0561/2168/8256/products/trumerholz-gehackte-larche-wohnwand_695x695.jpg?v=1660934418", "", 0, "",""),
    new Theme(0, "https://cdn.shopify.com/s/files/1/0561/2168/8256/products/trumerholz-gehackte-larche-wohnwand_695x695.jpg?v=1660934418", "", 0, "",""),
    new Theme(0, "https://cdn.shopify.com/s/files/1/0561/2168/8256/products/trumerholz-gehackte-larche-wohnwand_695x695.jpg?v=1660934418", "", 0, "",""),
    new Theme(0, "https://cdn.shopify.com/s/files/1/0561/2168/8256/products/trumerholz-gehackte-larche-wohnwand_695x695.jpg?v=1660934418", "", 0, "",""),
    new Theme(0, "https://cdn.shopify.com/s/files/1/0561/2168/8256/products/trumerholz-gehackte-larche-wohnwand_695x695.jpg?v=1660934418", "", 0, "",""),
    new Theme(0, "https://cdn.shopify.com/s/files/1/0561/2168/8256/products/trumerholz-gehackte-larche-wohnwand_695x695.jpg?v=1660934418", "", 0, "",""),
    new Theme(0, "https://cdn.shopify.com/s/files/1/0561/2168/8256/products/trumerholz-gehackte-larche-wohnwand_695x695.jpg?v=1660934418", "", 0, "","")
  ]

  //@Input('room') room : Room; //= new Room(0,  "small room", 0, "https://www.smb.museum/uploads/tx_smb/news/news_67970/Neues-Museum_Raum-Prolog_Achim_Kleuker_xl.jpg", "2.gltf", undefined)

  selected = "none";

  constructor() { }

  ngOnInit(): void {
  }

  print(event: FileUploadOutput) {
    this.fileUploadRes = event;
    console.log(event)
  }
}
