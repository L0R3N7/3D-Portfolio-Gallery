import {Component, OnInit, ViewChild} from '@angular/core';
import {NavbarServiceService} from "../../components/navbar/navbar-service.service";
import {FooterService} from "../../components/footer/footer.service";
import {MatStepper} from "@angular/material/stepper";
import {StepperSelectionEvent} from "@angular/cdk/stepper";

@Component({
  selector: 'app-create-exhibition-page',
  templateUrl: './create-exhibition-page.component.html',
  styleUrls: ['./create-exhibition-page.component.scss']
})
export class CreateExhibitionPageComponent implements OnInit {

  @ViewChild('stepper') stepper : MatStepper | undefined;
  constructor(public navbar: NavbarServiceService, public footer: FooterService) {}

  stepsCompleted : boolean[] = [];

  ngOnInit(): void {
    this.navbar.white = false;
    this.navbar.hide()
    this.footer.hide()
    this.stepsCompleted = new Array(this.stepper?.steps.length).fill(false);
  }

  selectionChanged(event: StepperSelectionEvent) {
  }
}
