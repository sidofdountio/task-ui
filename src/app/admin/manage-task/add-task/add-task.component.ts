import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Priority } from 'src/app/model/enume/priority';
import { Role } from 'src/app/model/enume/role';
import { TaskStatus } from 'src/app/model/enume/task-status';

import { Task } from 'src/app/model/task';
import { TaskRequest } from 'src/app/model/task-request';
import { User } from 'src/app/model/user';
import { AppService } from 'src/app/service/app-service.service';
import { SnackBarService } from 'src/app/service/snack-bar-service.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  ROLE_NAME:Role=Role.ROLE_USER;
  users: User[] = [];
  userList:User[] = []
  userById!:User;
  taskForm = this.fb.group({
    title: this.fb.nonNullable.control("", {
      validators: [Validators.required]
    }),
    description: ['', Validators.required],
    status: ['', Validators.required],
    priority: ['', Validators.required],
    dueDate: ['', Validators.required],
    assignee: this.fb.group({
      id: ['', Validators.required],
      name: [''],
      email: [''],
      role: [this.ROLE_NAME]
    })
  });

  taskToSave:Task = {
    id: 0,
    title: '',
    status: TaskStatus.PENDING,
    description: '',
    priority: Priority.HIGH,
    dueDate: '',
    assignee:{
      id: 1,
      name: '',
      email: '',
      role: Role.ROLE_USER
    }
  }


  constructor(private fb: FormBuilder, private appService: AppService,
    private snackbar: SnackBarService, private router: Router) {
  }

  ngOnInit(): void {
    this.appService.getUsers()
      .subscribe(
        (users) => { this.users = users ;
          this.userList=users;
        }
      )
  }

  loadUserById(id: any) {
    for(let user of this.userList){
      if(user.id === id){
        // console.log(user.role);
       this.ROLE_NAME = user.role;
       console.log(this.ROLE_NAME);
      }
    }
  }

  onSubmit() {

    this.taskToSave = {
      id: 0,
      title: this.taskForm.value.title as string,
      status: this.taskForm.value.status as TaskStatus,
      description: this.taskForm.value.description as string,
      priority: this.taskForm.value.priority as Priority,
      dueDate: this.taskForm.value.dueDate as string,
      assignee:{
        id: this.taskForm.value.assignee?.id as unknown as number,
        name: '',
        email: '',
        role: this.ROLE_NAME
      }
    }
    this.addTask(this.taskToSave);
  }


  addTask(task: Task) {
    this.appService.addTask(task).subscribe(
      () => {
        this.snackbar.openSnackBar("Task succesfuly Added", "close");
        this.router.navigate(['./admin']);
      },
      (error: HttpErrorResponse) => {
        this.snackbar.openSnackBar("An Error Occured", "close");
      }
    )
  }

  onClose() {

  }


  onSaveTask() {

  }


}
