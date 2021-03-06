import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../_models/User';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;
  isRegisterFormOnly = true;
  registerForm: FormGroup;
  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }

    this.registerForm = new FormGroup({
     userName: new FormControl('', [Validators.minLength(4), Validators.required]),
     email: new FormControl('', [Validators.required, Validators.email]),
     password: new FormControl('', Validators.minLength(6)),
     confirmPassword: new FormControl('')
   }, this.passwordMatchValidator);
  }

  passwordMatchValidator(fg: FormControl) {
    if (fg.get('password').value !== fg.get('confirmPassword').value) {
      return {password: true};
    }
    return null;
  }

  register() {
    if (this.registerForm.valid) {
    this.user = Object.assign({}, this.registerForm.value);
    this.authService.register(this.user).subscribe(() => {
      this.alertify.success('Zostałeś zarejestrowany');
      this.isRegisterFormOnly = false;
    }, (error: HttpErrorResponse) => {
      const errorPayload = JSON.parse(error.error);

      if (errorPayload.DuplicateEmail) {
        this.alertify.error('Ten adres e-mail już jest zarejestrowany');
      }
      if (errorPayload.DuplicateUserName) {
        this.alertify.error('Użytkownik o takiej nazwie już istnieje');
      }
      if (!errorPayload.DuplicateEmail && !errorPayload.DuplicateUserName) {
        this.alertify.error('Wystąpił błąd');
      }

    });
  }
  }

  sendConfirmationAgain() {
    this.authService.sendConfirmationAgain(this.user.email).subscribe(() => {
      this.alertify.success('Wysłano ponownie mail\'a potwierdzającego');
    }, error => {
      this.alertify.error('Wystąpił błąd');
      console.log(error);
    });
  }

}
