import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { AlertifyService } from '../../_services/alertify.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-ResetConfirm',
  templateUrl: './ResetConfirm.component.html',
  styleUrls: ['./ResetConfirm.component.css']
})
export class ResetConfirmComponent implements OnInit {

  model: any = {};
  email: string;
  token: string;
  result = '';
  passwordForm: FormGroup;

  constructor(private route: ActivatedRoute, private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
      this.route.queryParams.subscribe(params => {
        this.email = params.email;
        this.token = params.token;
        });
      if (!this.email || !this.token) {
          this.result = 'error';
      }

      this.passwordForm = new FormGroup({
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl('')
      }, this.passwordMatchValidator);
  }

  passwordMatchValidator(fg: FormGroup) {
    if (fg.get('password').value === fg.get('confirmPassword').value) {
        return null;
    }
    return {password: true};
  }

confirmPassword() {
if (this.passwordForm.valid) {
  this.model.password = this.passwordForm.get('password').value;

  this.model.token = this.token;
  this.authService.resetConfirm(this.email, this.model).subscribe(() => {
    console.log('Hasło zmienione');
    this.result = 'succes';
  }, error => {
    this.result = 'error';
  });
}
}

}
