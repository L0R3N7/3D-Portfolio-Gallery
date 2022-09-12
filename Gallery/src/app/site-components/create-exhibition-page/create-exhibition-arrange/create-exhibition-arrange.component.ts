import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-exhibition-arrange',
  templateUrl: './create-exhibition-arrange.component.html',
  styleUrls: ['./create-exhibition-arrange.component.scss']
})
export class CreateExhibitionArrangeComponent implements OnInit {

  blob : string | undefined;


  constructor() { }

  ngOnInit(): void {
  }

  print(event: string) {
    this.blob = event;
    console.log(event)
  }
}
