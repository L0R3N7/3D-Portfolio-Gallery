import { Component, OnInit } from '@angular/core';
import {Exhibition} from "../../shared/class/exhibition";
import {GalleryService} from "../../shared/gallery.service";

@Component({
  selector: 'app-exhibiton-list',
  templateUrl: './exhibiton-list.component.html',
  styleUrls: ['./exhibiton-list.component.scss']
})
export class ExhibitonListComponent implements OnInit {

  constructor(private gs: GalleryService) { }
  exhibitions: Exhibition[] = [];

  ngOnInit(): void {
    this.gs.getAllExhibitions().subscribe(res => this.exhibitions = res);
   }

}
