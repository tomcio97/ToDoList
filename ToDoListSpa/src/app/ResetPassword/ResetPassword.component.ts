import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ResetPassword',
  templateUrl: './ResetPassword.component.html',
  styleUrls: ['./ResetPassword.component.css']
})
export class ResetPasswordComponent implements OnInit {

  email: string;
  result = false;
  constructor(private authService: AuthService, private alertify: AlertifyService,private router: Router) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }

  }

  resetPassword() {
    this.authService.resetPassword(this.email).subscribe(() => {
      this.result = true;
    }, error => {
      if(error.error === 'Email not exist') {
          this.alertify.error('Taki adres e-mail nie jest zarejestrowany');
      }
    });
  }
}
