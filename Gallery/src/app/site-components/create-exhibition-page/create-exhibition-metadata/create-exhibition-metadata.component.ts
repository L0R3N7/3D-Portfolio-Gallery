import {Component, OnInit} from '@angular/core';
import {CreateExhibitionPageService, Metadata} from "../create-exhibition-page.service";
import {FileUploadOutput} from "../../../shared/file-upload-output";

@Component({
  selector: 'app-create-exhibition-metadata',
  templateUrl: './create-exhibition-metadata.component.html',
  styleUrls: ['./create-exhibition-metadata.component.scss']
})
export class CreateExhibitionMetadataComponent implements OnInit {
  selectedTagIds : number[] = []
  imageUrl ?: string;
  exhibitionName: string = "";
  description: string = "";
  thumbnailUrl = ''

  constructor(private createService : CreateExhibitionPageService) {
    let value = createService.wizMetadata.value
    this.exhibitionName = value?.title ?? ""
    this.selectedTagIds = value?.tagIds ?? []
    this.description = value?.desc ?? ""

    console.log(value?.tagIds)
  }

  change(){
    if (this.exhibitionName != ""){
      this.createService.wizMetadata.next(new Metadata(this.exhibitionName, this.description, this.selectedTagIds, this.thumbnailUrl))
      this.createService.saveMetaDate();
    }else{
      this.createService.wizMetadata.next(undefined)
    }
  }


  ngOnInit(): void {
  }

  thumbnailUploaded(event: FileUploadOutput) {
    this.thumbnailUrl = event.url
    this.change()
  }
}
