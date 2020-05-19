import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

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

register(model: any) {
  return this.http.post(this.baseUrl + 'register', model, {responseType: 'text'});
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

}
