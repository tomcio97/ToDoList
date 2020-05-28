import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Task } from '../_models/Task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

baseUrl = environment.apiUrl;
constructor(private httpClient: HttpClient) { }

getTasks(userName: string, status?): Observable<Task[]> {

  let params = new HttpParams();
  if (status) {
      params = params.append('status', status);
  }

  return this.httpClient.get<Task[]>(this.baseUrl + userName + '/todos', {params});
}

createTask(userName: string, model: any) {
  return this.httpClient.post(this.baseUrl + userName + '/todos', model);
}

}
