import {Component, OnInit} from '@angular/core';
import {CreateExhibitionPageService} from "../create-exhibition-page.service";

@Component({
  selector: 'app-create-exhibition-metadata',
  templateUrl: './create-exhibition-metadata.component.html',
  styleUrls: ['./create-exhibition-metadata.component.scss']
})
export class CreateExhibitionMetadataComponent implements OnInit {
  selectedTagIds : number[] = []

  constructor(private createService: CreateExhibitionPageService) {}

  ngOnInit(): void {
  }

}
