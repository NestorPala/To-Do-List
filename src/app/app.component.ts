import { Component } from '@angular/core';
import { Task } from './task/Task'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'To-Do List';

  // save the tasks locally on the computer
  myStorage = window.localStorage;

  emptyListText = document.createElement("p");

  tasks: Task[] = [
    // {
    //   "title":"study maths",
    //   "time":"10:00",
    //   "done":true
    // },
  ];


  checkEmptyList() {
    if (this.tasks.length != 0) {
      document.getElementById("empty-list-text")!.removeChild(this.emptyListText);
      return;
    }
    this.emptyListText.innerHTML = "You haven't added any tasks yet";
    this.emptyListText.setAttribute("style", "font-family: 'Fira Sans', sans-serif;text-align: center;margin: 50px;font-weight: bold;color: darkgrey;");
    document.getElementById("empty-list-text")!.appendChild(this.emptyListText);
  }


  ngOnInit() {
    let tasks = this.myStorage.getItem("tasks");
    this.tasks = JSON.parse(tasks !== null ? tasks : "[]");
    this.checkEmptyList();
  }


  saveChanges() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
    this.checkEmptyList();
  }


  addTask(taskTitle: HTMLInputElement, taskTime: HTMLInputElement) {
    if (taskTitle.value === "" || taskTime.value === "") {
      alert("Please add some information before adding a task");
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
    taskTitle.value = "";
    taskTime.value = "";
    alert("The task has been added successfully!");
    this.saveChanges();
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
    if (!confirm("Are you sure you want to remove this task from the list?")) {
      return;
    }
    for(let i=0; i<this.tasks.length; i++) {
      if (this.tasks[i] === taskToRemove) {
        this.tasks.splice(i, 1);
      }
    }
    this.saveChanges();
    alert("The task has been removed successfully!");
  }


  moveTaskUp(task: Task) {
    for(let i=0; i<this.tasks.length; i++) {
      if (this.tasks[i] === task) {
        if (i == 0) {
          alert("The task is already at the top of the list.");
          return;
        }
        let aux = this.tasks[i-1];
        this.tasks[i-1] = this.tasks[i];
        this.tasks[i] = aux;
        break;
      }
    }
    this.saveChanges();
  }


  moveTaskDown(task: Task) {
    for(let i=0; i<this.tasks.length; i++) {
      if (this.tasks[i] === task) {
        if (i == this.tasks.length-1) {
          alert("The task is already at the bottom of the list.");
          return;
        }
        let aux = this.tasks[i+1];
        this.tasks[i+1] = this.tasks[i];
        this.tasks[i] = aux;
        break;
      }
    }
    this.saveChanges();
  }
}