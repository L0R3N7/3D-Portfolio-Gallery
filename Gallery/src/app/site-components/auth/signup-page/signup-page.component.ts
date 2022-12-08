import { Component, OnInit } from '@angular/core';
import {NavbarServiceService} from "../../../components/navbar/navbar-service.service";
import {FooterService} from "../../../components/footer/footer.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

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

  constructor(public navbar: NavbarServiceService, public footer: FooterService, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.navbar.hide()
    this.navbar.changeWhite()
    this.footer.hide()
  }

  onSubmit() {
    if(this.signupForm.valid){
      localStorage.setItem('id_token', "token")
      let date = new Date()
      date.setHours(date.getHours() + 1)
      localStorage.setItem('expires_at', String(date.getTime() / 1000))
      this.router.navigateByUrl('/profile')
      // TODO add logic when endpoint work
      /*this.auth.login(new UserLoginDTO(this.loginForm.value.emailOrUsername ?? '', this.loginForm.value.password ?? '')).subscribe(
        value => {
          console.log("log")
          localStorage.setItem('id_token', value.token)
          //TODO when JWT Token works use real values
          //localStorage.setItem('expires_at', value.expires_at)
          let date = new Date()
          date.setHours(date.getHours() + 1)
          localStorage.setItem('expires_at', String(date.getTime() / 1000))
          this.router.navigateByUrl('/profile')
        }, error => {
          console.log("Login Unscuc")
          console.log(error)
          this.auth.logout()
        }
      )*/
    }
  }
}
