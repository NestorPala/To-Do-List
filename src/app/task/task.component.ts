import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from './Task'

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent implements OnInit {

  @Input() task: Task = {
    title:"",
    time:"",
    done:false
  };

  @Output() taskRemover = new EventEmitter<Task>();
  @Output() taskMarker = new EventEmitter<{task: Task, done: boolean}>();

  constructor() { 
  }

  ngOnInit(): void {
  }

  toggleDoneFire() {
    let isTaskDone = !this.task.done;
    this.taskMarker.emit({task: this.task, done: isTaskDone});
  }

  removeTask() {
    this.taskRemover.emit(this.task);
  }
}
