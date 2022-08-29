import { Component } from '@angular/core';
import { Task } from './task/Task'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'todolist';

  // save the tasks locally on the computer
  myStorage = window.localStorage;

  tasks: Task[] = [
    // {
    //   "title":"study maths",
    //   "time":"10:00",
    //   "done":true
    // },
  ];

  ngOnInit() {
    let tasks = this.myStorage.getItem("tasks");
    this.tasks = JSON.parse(tasks !== null ? tasks : "[]");
  }

  saveChanges() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  addTask(taskTitle: HTMLInputElement, taskTime: HTMLInputElement) {
    if (taskTitle.value === "" || taskTime.value === "") {
      alert("Please add the information before adding a task");
      return;
    }

    let timePattern = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

    if (timePattern.test(taskTime.value) === false) {
      alert("Please add a valid time for the task, for example: '17:45'");
      return;
    }

    let newTask: Task = {
      title : taskTitle.value,
      time : taskTime.value,
      done : false
    };

    this.tasks.push(newTask);
    this.saveChanges();

    taskTitle.value = "";
    taskTime.value = "";
  }

  markTask(markedTask: {task: Task, done: boolean}) {
    for(let i=0; i<this.tasks.length; i++) {
      if (this.tasks[i] === markedTask.task) {
        this.tasks[i].done = markedTask.done;
      }
    }
    this.saveChanges();
  }

  removeTask(taskToRemove: Task) {
    for(let i=0; i<this.tasks.length; i++) {
      if (this.tasks[i] === taskToRemove) {
        this.tasks.splice(i, 1);
      }
    }
    this.saveChanges();
    alert("Task removed successfully!");
  }
}