import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Task } from '../_models/Task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

baseUrl = environment.apiUrl;
constructor(private httpClient: HttpClient) { }

getTasks(userName: string): Observable<Task[]> {
 return this.httpClient.get<Task[]>(this.baseUrl + userName + '/todos');
}

}
