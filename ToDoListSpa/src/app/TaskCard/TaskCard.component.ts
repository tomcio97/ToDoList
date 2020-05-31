import { Component, OnInit, Input, Output } from '@angular/core';
import { Task } from '../_models/Task';
import { AuthService } from '../_services/auth.service';
import { TasksService } from '../_services/Tasks.service';
import { AlertifyService } from '../_services/alertify.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-TaskCard',
  templateUrl: './TaskCard.component.html',
  styleUrls: ['./TaskCard.component.css']
})
export class TaskCardComponent implements OnInit {

  @Input() task: Task;
  @Output() eventEmitter = new EventEmitter();

  constructor(private authService: AuthService, private tasksService: TasksService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  daysLeft() {
    if (this.task.isDone) {
      return -1;
    }
    const firstDate = new Date();
    const secondDate = new Date(this.task.deathLine);
    if (secondDate.getFullYear() === 1) {
      return -1;
    }

    const differenceInTime = secondDate.getTime() - firstDate.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

    return differenceInDays;
  }

  changeStatus() {
      this.tasksService.changeStatus(this.authService.decodedToken().unique_name, this.task.id).subscribe(() => {
        this.alertify.success('Zmieniono status na zrobiony');
        this.eventEmitter.emit(this.task.id);
        
      }, error => {
          this.alertify.error(error.error);
      });
  }

  deleteTask() {
    this.alertify.confirm('Czy napewno chcesz usunąc zadanie?', () => {
      this.tasksService.deleteTask(this.authService.decodedToken().unique_name, this.task.id).subscribe(() => {
        this.alertify.success('Usunięto zadanie');
        this.eventEmitter.emit(this.task.id);
      }, error => {
        this.alertify.error('Nie udało się usunąć zadania');
      });
    });

  }

}
