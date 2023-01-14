import {Component, OnInit} from '@angular/core';
import {FileUploadOutput} from "../../../shared/file-upload-output";

@Component({
  selector: 'app-create-exhibition-metadata',
  templateUrl: './create-exhibition-metadata.component.html',
  styleUrls: ['./create-exhibition-metadata.component.scss']
})
export class CreateExhibitionMetadataComponent implements OnInit {
  selectedTagIds : number[] = []
  selectedFoto?: FileUploadOutput;
  imageUrl ?: string;

  constructor() {}

  ngOnInit(): void {
  }

  setSelectedFoto(value: FileUploadOutput){
    this.selectedFoto = value;
    this.imageUrl = URL.createObjectURL(value.blob);
  }
}
