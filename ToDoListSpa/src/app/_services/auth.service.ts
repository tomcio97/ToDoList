import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/User';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

baseUrl = environment.apiUrl + 'auth/';

constructor(private http: HttpClient) { }

login(model: any) {
  return this.http.post(this.baseUrl + 'login', model)
                  .pipe(map((response: any) => {
                    const user = response;
                    localStorage.setItem('token', user.token);
                  }));
}

isLoggedIn() {
  const token = localStorage.getItem('token');
  return !!token;
}

logout() {
  if (this.isLoggedIn()) {
    localStorage.removeItem('token');
  }
}

register(user: User) {
  return this.http.post(this.baseUrl + 'register', user, {responseType: 'text'});
}

confirmation(email, token) {

  let params = new HttpParams();

  params = params.append('email', email);
  params = params.append('token', token);

  return this.http.get(this.baseUrl + 'confirm', {responseType: 'text', params});
}

sendConfirmationAgain(email) {
  let params = new HttpParams();
  params = params.append('email', email);

  return this.http.get(this.baseUrl + 'registerToken', {params});
}

resetPassword(email){
  return this.http.get(this.baseUrl + 'reset/' + email, {responseType: 'text'});
}

resetConfirm(email, model) {
 return this.http.put(this.baseUrl + 'confirmReset/' + email, model, {responseType: 'text'});
}

decodedToken() {
  const helper = new JwtHelperService();
  return helper.decodeToken(localStorage.getItem('token'));
}

}
