import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthenticationRequest } from 'src/app/model/authentication-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  message: string = "";
  form = this.fb.group({
    email: this.fb.nonNullable.control("", {
      validators: [Validators.required, Validators.email],
    }),
    password: ['', [Validators.required, Validators.minLength(8)]]
  });
  constructor(public authService: AuthService, private router: Router, private fb: FormBuilder) {

  }


  onLogIn(): void {
    this.authService.login$(this.form.value as AuthenticationRequest)
      .subscribe(
        (response => {
          
          this.router.navigate(['/admin'])
        }),
        (() => {
          this.authService.openSnackBarCustorm("username or password not found", "Close")
        })
      )
  }
  onLogout() {
    this.authService.logout$;
  }
}
