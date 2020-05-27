import { Component, OnInit } from '@angular/core';
import { TasksService } from '../_services/Tasks.service';
import { Task } from '../_models/Task';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-ToDo',
  templateUrl: './ToDo.component.html',
  styleUrls: ['./ToDo.component.css']
})
export class ToDoComponent implements OnInit {

  tasks: Task[];
  helper = new JwtHelperService();
  decodedToken: any = {};

  constructor(private tasksService: TasksService, private authService: AuthService) { }

  ngOnInit() {
    this.decodedToken = this.authService.decodedToken();
    console.log(this.decodedToken.unique_name);
    this.getTasks();
  }


  getTasks() {
    this.tasksService.getTasks(this.decodedToken.unique_name).subscribe(tasks => {
        this.tasks = tasks;
        console.log(this.tasks);
      }, error => {
        console.log(error);
      });
  }
}
