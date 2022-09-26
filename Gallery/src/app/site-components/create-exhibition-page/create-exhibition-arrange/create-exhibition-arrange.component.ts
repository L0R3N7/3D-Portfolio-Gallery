import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { FileUploadOutput} from "../../../shared/file-upload-output";
import { Exhibit } from 'src/app/shared/class/exhibit';
import { Material } from 'three';
import { Theme } from 'src/app/shared/class/theme';


@Component({
  selector: 'app-create-exhibition-arrange',
  templateUrl: './create-exhibition-arrange.component.html',
  styleUrls: ['./create-exhibition-arrange.component.scss']
})
export class CreateExhibitionArrangeComponent implements OnInit {

  fileUploadRes : FileUploadOutput | undefined;
  @Input('ExhibitList') exhibitList : Exhibit[] = [new Exhibit(0, "", "", "Vase", "Tolle Vase")]
  @Input('MaterialList') materialList : Theme[] = [new Theme(0, "", "", "Vase", "Tolle Vase")]
  selected = "none"; 

  
  constructor() { }

  ngOnInit(): void {
  }

  print(event: FileUploadOutput) {
    this.fileUploadRes = event;
    console.log(event)
  }
}
