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
  }

}
