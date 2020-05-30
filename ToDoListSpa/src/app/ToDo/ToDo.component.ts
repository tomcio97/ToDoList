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

  constructor(private tasksService: TasksService, private authService: AuthService) { }

  ngOnInit() {
    this.getTasks();
  }


  getTasks() {
    this.tasksService.getTasks(this.authService.decodedToken().unique_name, 'todo').subscribe(tasks => {
        this.tasks = tasks;
      }, error => {
        console.log(error);
      });
  }

  removeFromTable(event) {

    this.tasks.splice(this.tasks.findIndex(t => t.id === event), 1);

  }
}
