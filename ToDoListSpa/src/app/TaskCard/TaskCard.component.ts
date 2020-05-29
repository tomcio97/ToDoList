import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../_models/Task';

@Component({
  selector: 'app-TaskCard',
  templateUrl: './TaskCard.component.html',
  styleUrls: ['./TaskCard.component.css']
})
export class TaskCardComponent implements OnInit {

  @Input() task: Task;

  constructor() { }

  ngOnInit() {


    console.log(this.daysLeft());

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


}
