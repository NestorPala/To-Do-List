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
  @Output() taskUpMover = new EventEmitter<Task>();
  @Output() taskDownMover = new EventEmitter<Task>();
  @Output() taskNameChanger = new EventEmitter<{task: Task, title: string}>();
  @Output() taskTimeChanger = new EventEmitter<{task: Task, time: string}>();

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

  moveTaskUp() {
    this.taskUpMover.emit(this.task);
  }

  moveTaskDown() {
    this.taskDownMover.emit(this.task);
  }

  editTaskTitle() {
    let newTitle = prompt("Enter a new name for the task:");
    if (newTitle === null || newTitle == "") {
      alert("Task name has not been changed");
      return;
    }
    this.taskNameChanger.emit({task: this.task, title: newTitle});
  }

  editTaskTime() {
    let newTime = prompt("Enter a new time for the task:");
    if (newTime === null || /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(newTime) === false) {
      alert("Please add a valid time for the task, for example: '17:45'");
      alert("Task time has not been changed");
      return;
    }
    this.taskTimeChanger.emit({task: this.task, time: newTime});
  }
}
