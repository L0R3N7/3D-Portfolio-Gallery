import { Component, OnInit } from '@angular/core';
import {NavbarServiceService} from "../../components/navbar/navbar-service.service";
import {FooterService} from "../../components/footer/footer.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  signupForm = new FormGroup({
    username : new FormControl('', Validators.required),
    email : new FormControl('', Validators.email),
    password : new FormControl('', Validators.required),
    confirmPassword : new FormControl('', Validators.required),
  })

  constructor(public navbar: NavbarServiceService, public footer: FooterService) { }

  ngOnInit(): void {
    this.navbar.hide()
    this.navbar.changeWhite()
    this.footer.hide()
  }

  submit() {}
}
