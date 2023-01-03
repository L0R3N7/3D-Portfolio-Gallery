import { Component, OnInit } from '@angular/core';
import {NavbarServiceService} from "../../../components/navbar/navbar-service.service";
import {FooterService} from "../../../components/footer/footer.service";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {UserNewDTO} from "../../../shared/class/dto/UserNewDTO";
import {UserLoginDTO} from "../../../shared/class/dto/UserLoginDTO";

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  signupForm = new FormGroup({
    username : new FormControl('', Validators.required),
    email : new FormControl('', [Validators.email, Validators.required]),
    password : new FormControl('', Validators.required),
    confirmPassword : new FormControl('', Validators.required),
  },
    [CustomValidators.MatchValidator('password', 'confirmPassword')]
  )
  get passwordMatchError(){
    return (
      this.signupForm.getError('mismatchError') &&
        this.signupForm.get('confirmPassword')?.touched
    )
  }

  constructor(public navbar: NavbarServiceService, public footer: FooterService, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.navbar.hide()
    this.navbar.changeWhite()
    this.footer.hide()
  }

  onSubmit() {
    if(this.signupForm.valid) {
      const email = this.signupForm.value.email!
      const name = this.signupForm.value.username!
      const password = this.signupForm.value.password!
      this.auth.newUsers(new UserNewDTO(name, email, "https://randomuser.me/api/portraits/women/7.jpg", password))
        .subscribe({
            next: value => {
              this.auth.login(new UserLoginDTO(name, password)).subscribe({
                  next: value1 => {
                    this.auth.setSaveJWT(value1)
                    this.router.navigateByUrl('/profile')
                  },
                  error: err => {
                    this.auth.logout()
                    //Todo - error msg
                  }
                }
              )
            },
            error: value => {
              // TODO - Error Msg
            }
          }
        )
    }
  }
}

export class CustomValidators {
  static MatchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(source)
      const targetCtrl = control.get(target)

      return sourceCtrl && targetCtrl &&sourceCtrl.value !== targetCtrl.value
        ? {mismatchError: true}
        : null
    }
  }
}
