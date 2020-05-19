import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};
  isRegisterFormOnly = true;
  registerForm: FormGroup;
  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
   this.registerForm = new FormGroup({
     userName: new FormControl(),
     email: new FormControl(),
     password: new FormControl(),
     confirmPassword: new FormControl()
   });
  }


  register() {
    // this.authService.register(this.model).subscribe(() => {
    //   this.alertify.success('Zostałeś zarejestrowany');
    //   this.isRegisterFormOnly = false;
    // }, error => {
    //   this.alertify.error('Wystąpił błąd');
    //   console.log(error);
    // });

    console.log(this.registerForm.value);
  }

  sendConfirmationAgain() {
    this.authService.sendConfirmationAgain(this.model.email).subscribe(() => {
      this.alertify.success('Wysłano ponownie mail\'a potwierdzającego');
    }, error => {
      this.alertify.error('Wystąpił błąd');
      console.log(error.errors);
    });
  }

}
