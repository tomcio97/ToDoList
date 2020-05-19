import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};

  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  login() {
    this.authService.login(this.model).subscribe(() => {
      this.alertify.success('Zostałeś zalogowany');
    }, error => {
      this.alertify.error('Logowanie nie powiodło się');
    }, () => {
      this.router.navigate(['/']);
    });
  }

}
