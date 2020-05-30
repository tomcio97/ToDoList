import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../_models/Task';
import { TasksService } from '../_services/Tasks.service';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-EditTask',
  templateUrl: './EditTask.component.html',
  styleUrls: ['./EditTask.component.css']
})
export class EditTaskComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private tasksService: TasksService,
              private authService: AuthService,
              private alertify: AlertifyService,
              private router: Router) { }

  taskId: number;
  task: Task;
  model: any;
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.taskId = params.id;
    });

    this.getTask();

  }


  getTask() {
    this.tasksService.getTask(this.authService.decodedToken().unique_name, this.taskId).subscribe((task: Task) => {
    this.task = task;
    console.log(task);
    }, error => {
      console.log(error);
    });
  }

  updateTask() {
    this.tasksService.updateTask(this.authService.decodedToken().unique_name, this.taskId, this.task).subscribe(() => {
      this.alertify.success('Zaktualizowano zadanie');
      this.router.navigate(['/']);
    }, error => {
      this.alertify.error(error.error);
    });
  }

}
