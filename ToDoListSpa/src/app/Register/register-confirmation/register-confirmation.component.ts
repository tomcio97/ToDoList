import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { error } from 'protractor';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-register-confirmation',
  templateUrl: './register-confirmation.component.html',
  styleUrls: ['./register-confirmation.component.css']
})
export class RegisterConfirmationComponent implements OnInit {

  constructor(private route: ActivatedRoute, private authService: AuthService, private alertify: AlertifyService) { }

  email: string;
  token: string;
  result: string;

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
        this.email = params.email;
        this.token = params.token;
      });

    this.authService.confirmation(this.email, this.token).subscribe(() => {
      console.log('Potwierdzono');
      this.result = 'confirm';
    }, (error) => {
      console.log(error);
      this.result = 'reject';
    });

    console.log(this.email);
    console.log(this.token);

  }

  sendConfirmationAgain() {
    this.authService.sendConfirmationAgain(this.email).subscribe(() => {
      this.alertify.success('Wysłano ponownie mail\'a potwierdzającego');
    }, error => {
      this.alertify.error('Wystąpił błąd');
    });

  }

}