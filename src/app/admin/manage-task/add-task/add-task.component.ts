import { DialogRef } from '@angular/cdk/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Priority } from 'src/app/model/enume/priority';
import { TaskStatus } from 'src/app/model/enume/task-status';
import { Task } from 'src/app/model/task';
import { User } from 'src/app/model/user';
import { AppService } from 'src/app/service/app-service.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  user!:User
  task: Task = {
    title: '',
    status: TaskStatus.PENDING,
    description: '',
    priority: Priority.MEDIUM,
    dueDate: '',
    user: this.user
  }
  startDate: any;
  users: User[] = [];


  taskToSave: Task = {
    title: '',
    status: TaskStatus.PENDING,
    description: '',
    priority: Priority.MEDIUM,
    dueDate: '',
    user: this.user
  }
  taskForm!: FormGroup;

  

  


  constructor(private fb: FormBuilder, private appService:AppService,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    public dialogRef: DialogRef<AddTaskComponent>) {
    this.task = {
      title: data.title,
      status: data.status,
      description: data.description,
      priority: data.priority,
      dueDate: data.dueDate,
      user: data.user
    }
  }


  ngOnInit(): void {

    
    this.appService.getUsers().subscribe(
      (response)=>{
        this.users = response;
      },
      (error:HttpErrorResponse)=>{
        console.log("Error occured : %s",error.status);
      }
    );

    this.taskForm = this.fb.group({
      title: [this.task.title, [Validators.required]],
      description: [this.task.description, [Validators.required]],
      status: [this.task.status, [Validators.required]],
      priority: [this.task.priority, [Validators.required]],
      dueDate: [this.task.dueDate, [Validators.required]],
      userForm: this.fb.group({
        id: [this.taskToSave.user,[]]
      })
    });
  }
  onClose() {
    this.dialogRef.close();
  }
  onSaveTask() {
    console.log("=============")
    console.log( this.taskForm.value);
    console.log("=============")
    this.dialogRef.close(this.taskForm.value)
  }


}
