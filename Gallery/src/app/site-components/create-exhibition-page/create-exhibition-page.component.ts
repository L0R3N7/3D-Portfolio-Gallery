import {Component, OnInit, ViewChild} from '@angular/core';
import {NavbarServiceService} from "../../components/navbar/navbar-service.service";
import {FooterService} from "../../components/footer/footer.service";
import {MatStepper} from "@angular/material/stepper";
import {StepperSelectionEvent} from "@angular/cdk/stepper";
import {Exhibition} from "../../shared/class/exhibition";
import {Exhibit} from "../../shared/class/exhibit";
import {CreateExhibitionPageService} from "./create-exhibition-page.service";

@Component({
  selector: 'app-create-exhibition-page',
  templateUrl: './create-exhibition-page.component.html',
  styleUrls: ['./create-exhibition-page.component.scss']
})
export class CreateExhibitionPageComponent implements OnInit {

  @ViewChild('stepper') stepper : MatStepper | undefined;
  selectedIndex = 0
  stepsCompleted : boolean[] = [];
  exhibitionList : Exhibit[] | undefined = [];

  constructor(private createService: CreateExhibitionPageService, navbar: NavbarServiceService, footer: FooterService) {
    navbar.white = false
    navbar.hide()
    footer.hide()
    this.selectedIndex = this.createService.getSelectedState()
  }

  ngOnInit(): void {
    this.stepsCompleted = new Array(this.stepper?.steps.length).fill(false)
    this.createService.wizMetadata.subscribe(value => {
      this.stepsCompleted[0] = value != undefined
    })
    this.createService.wizExhibits.subscribe(value => {
      this.stepsCompleted[1] = value.length > 0
    })
  }

  selectionChanged(event: StepperSelectionEvent) {
  }
}
