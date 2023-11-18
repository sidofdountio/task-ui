import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthenticationRequest } from 'src/app/model/authentication-request';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/service/snack-bar-service.service';
import { RegisteRequester } from 'src/app/model/register-request';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = this.fb.group({
    username: ['' , [Validators.required]],
    email: this.fb.nonNullable.control("", {
      validators: [Validators.required, Validators.email],
    }),
    password: ['', [Validators.required, Validators.minLength(8)]]
  });


  constructor(private fb: FormBuilder, private authService: AuthService,private router:Router
    ,private snacbarService:SnackBarService) { }

  onRegister() {
    this.authService.register$(this.registerForm.value as RegisteRequester)
      .subscribe(
        (response => {
          this.snacbarService.openSnackBar("Account Successfuly Created","X");
          this.router.navigate(['/login'])
        }),
        (() => {
          this.authService.openSnackBarCustorm("An error occured", "Close");
        })
      )
  }
}
