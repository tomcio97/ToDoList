import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-Nav',
  templateUrl: './Nav.component.html',
  styleUrls: ['./Nav.component.css']
})
export class NavComponent implements OnInit {

  decodedToken: any = {};

  constructor(private router: Router, private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.decodedToken = this.authService.decodedToken();
    console.log(this.decodedToken);
  }

  checkRouterLink(link: string) {
    if (this.router.url === link) {
        return true;
    }
    return false;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.alertify.message('Zostałeś wylogowany');
  }
}
