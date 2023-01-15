import {Component, OnInit} from '@angular/core';
import {FileUploadOutput} from "../../../shared/file-upload-output";
import {CreateExhibitionPageService, Metadata} from "../create-exhibition-page.service";

@Component({
  selector: 'app-create-exhibition-metadata',
  templateUrl: './create-exhibition-metadata.component.html',
  styleUrls: ['./create-exhibition-metadata.component.scss']
})
export class CreateExhibitionMetadataComponent implements OnInit {
  selectedTagIds : number[] = []
  selectedFoto?: FileUploadOutput;
  imageUrl ?: string;
  exhibitionName: string = "";
  description: string = "";

  constructor(private createService : CreateExhibitionPageService) {
    let value = createService.wizMetadata.value
    this.exhibitionName = value?.title ?? ""
    this.selectedTagIds = value?.tagIds ?? []
    this.description = value?.desc ?? ""

    console.log(value?.tagIds)
  }

  change(){
    if (this.exhibitionName != ""){
      this.createService.wizMetadata.next(new Metadata(this.exhibitionName, this.description, this.selectedTagIds, undefined))
      this.createService.saveMetaDate();
    }else{
      this.createService.wizMetadata.next(undefined)
    }
  }


  ngOnInit(): void {
  }

  setSelectedFoto(value: FileUploadOutput){
    this.selectedFoto = value;
    this.imageUrl = URL.createObjectURL(value.blob);
    this.change()
  }
}
