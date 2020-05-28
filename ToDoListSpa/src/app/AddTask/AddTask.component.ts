import { Component, OnInit } from '@angular/core';
import { Task } from '../_models/Task';
import { TasksService } from '../_services/Tasks.service';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-AddTask',
  templateUrl: './AddTask.component.html',
  styleUrls: ['./AddTask.component.css']
})
export class AddTaskComponent implements OnInit {

  task: Task;
  model: any = {};
  name: string;
  description: string;
  constructor(private taskService: TasksService, private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  addTask() {
    this.taskService.createTask(this.authService.decodedToken().unique_name, this.model).subscribe( () => {
        this.alertify.success('Dodano nowe zadanie!');
      }, error =>
      {
        console.log(error);
      });
  }
}
