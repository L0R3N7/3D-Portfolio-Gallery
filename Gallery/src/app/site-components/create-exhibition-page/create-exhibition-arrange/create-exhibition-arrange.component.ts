import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import {FileUploadOutput} from "../../../shared/file-upload-output";

@Component({
  selector: 'app-create-exhibition-arrange',
  templateUrl: './create-exhibition-arrange.component.html',
  styleUrls: ['./create-exhibition-arrange.component.scss']
})
export class CreateExhibitionArrangeComponent implements OnInit {

  fileUploadRes : FileUploadOutput | undefined;
  @Input('')
  
    movies = [
      'Episode I - The Phantom Menace',
      'Episode II - Attack of the Clones',
      'Episode III - Revenge of the Sith',
      'Episode IV - A New Hope',
      'Episode V - The Empire Strikes Back',
      'Episode VI - Return of the Jedi',
      'Episode VII - The Force Awakens',
      'Episode VIII - The Last Jedi',
      'Episode IX – The Rise of Skywalker',
    ];
  
    drop(event: CdkDragDrop<string[]>) {
      moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
    }
    
  constructor() { }

  ngOnInit(): void {
  }

  print(event: FileUploadOutput) {
    this.fileUploadRes = event;
    console.log(event)
  }
}
