import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Exhibit} from "../../shared/class/exhibit";
import {GalleryService} from "../../shared/gallery.service";

@Component({
  selector: 'app-exhibit-card',
  templateUrl: './exhibit-card.component.html',
  styleUrls: ['./exhibit-card.component.scss']
})
export class ExhibitCardComponent implements OnInit {

  @Input('exhibit') exhibit ?: Exhibit;
  @Input('count') count : number = 0;
  @Output('delete') deleteEvent = new EventEmitter<number>();
  imageName = ''

  constructor(private galleryService: GalleryService) {
  }

  ngOnInit(): void {
    this.imageName = this.getImageName()
  }

  delete() {
    this.deleteEvent.emit(this.count);
  }

  getImageName() : string{
    console.log(this.exhibit)

    if (this.exhibit){
      const fileTypeOfExhibit = this.galleryService.getFileTypeCategoryByFileType(this.exhibit.data_type) ?? ''
      console.log(fileTypeOfExhibit)

      return fileTypeOfExhibit.concat("icon.svg")
    }
    return ''
  }
}
