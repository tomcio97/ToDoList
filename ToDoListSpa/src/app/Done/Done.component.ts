import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TasksService } from '../_services/Tasks.service';
import { Task } from '../_models/Task';

@Component({
  selector: 'app-Done',
  templateUrl: './Done.component.html',
  styleUrls: ['./Done.component.css']
})
export class DoneComponent implements OnInit {

  tasks: Task[];
  constructor(private authService: AuthService, private tasksService: TasksService) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.tasksService.getTasks(this.authService.decodedToken().unique_name, 'done').subscribe(tasks => {
        this.tasks = tasks;
      }, error => {
        console.log(error);
      });
  }

  removeFromTable(event) {

    this.tasks.splice(this.tasks.findIndex(t => t.id === event), 1);
  }
}
