import { Component, OnInit } from '@angular/core';
import {NavbarServiceService} from "../../components/navbar/navbar-service.service";
import {FooterService} from "../../components/footer/footer.service";
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {GalleryService} from "../../shared/gallery.service";
import {User} from "../../shared/class/user";
import {ActivatedRoute, Route, Router} from "@angular/router";

@Component({
  selector: 'app-log-signin-page',
  templateUrl: './log-signin-page.component.html',
  styleUrls: ['./log-signin-page.component.scss']
})
export class LogSigninPageComponent implements OnInit {
  loginForm = new FormGroup({
    emailOrUsername: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private navbar: NavbarServiceService,
              private footer: FooterService,
              private gallery: GalleryService,
              private route: ActivatedRoute,
              private router: Router) {}


  ngOnInit(): void {
    this.navbar.hide()
    this.navbar.changeWhite()
    this.footer.hide()
  }

  onSubmit() {
    this.gallery.logIn(new User(-1, this.loginForm.value.emailOrUsername ?? "", this.loginForm.value.emailOrUsername ?? "", this.loginForm.value.password ?? "", ""));
    console.log(this.gallery.isLoggedIn)
    this.router.navigate(['../profile'], {relativeTo: this.route})
  }
}
