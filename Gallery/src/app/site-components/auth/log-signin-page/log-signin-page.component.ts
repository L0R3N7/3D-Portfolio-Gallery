import { Component, OnInit } from '@angular/core';
import {NavbarServiceService} from "../../../components/navbar/navbar-service.service";
import {FooterService} from "../../../components/footer/footer.service";
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {GalleryService} from "../../../shared/gallery.service";
import {User} from "../../../shared/class/user";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {UserLoginDTO} from "../../../shared/class/dto/UserLoginDTO";
import {AuthService} from "../auth.service";

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
              private auth: AuthService,
              private router: Router
  ) {}


  ngOnInit(): void {
    this.navbar.hide()
    this.navbar.changeWhite()
    this.footer.hide()
  }

  onSubmit() {
    if(this.loginForm.valid){
      this.auth.login(new UserLoginDTO(this.loginForm.value.emailOrUsername ?? '', this.loginForm.value.password ?? '')).subscribe(
        value => {
          let decodedJWTPayload = JSON.parse(atob(value.split('.')[1]))

          console.log(value)
          localStorage.setItem("user", decodedJWTPayload.sub)
          localStorage.setItem('id_token', value)
          localStorage.setItem('expires_at', decodedJWTPayload.exp)
          this.router.navigateByUrl('/profile')
        }, error => {
          console.log("Login Unscuc")
          console.log(error)
          this.auth.logout()
        }
      )
    }
  }
}
