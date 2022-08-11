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
  constructor(public navbar: NavbarServiceService, public footer: FooterService) {

  }



  ngOnInit(): void {
    this.navbar.white = false;
    this.navbar.hide()
    this.footer.hide()
  }

  selectionChanged(event: StepperSelectionEvent) {
    console.log(event.selectedIndex)
  }
}
