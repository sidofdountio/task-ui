import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Priority } from 'src/app/model/enume/priority';
import { Role } from 'src/app/model/enume/role';
import { TaskStatus } from 'src/app/model/enume/task-status';
import { Task } from 'src/app/model/task';
import { TaskRequest } from 'src/app/model/task-request';
import { User } from 'src/app/model/user';
import { AppService } from 'src/app/service/app-service.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {

  taskToSave: Task = {
    title: '',
    status: TaskStatus.PENDING,
    description: '',
    priority: Priority.MEDIUM,
    dueDate: '',
    user: {
      email: '',
      id: 1,
      name: '',
      role: Role.USER
    }
  }

  users!: User[];

  FormTask = this.fb.group({
    title: this.fb.nonNullable.control("",{
      validators:[Validators.required]
    }),
    description: ['', Validators.required],
    status: ['', Validators.required],
    priority: ['', Validators.required],
    dueDate: ['', Validators.required],
    userForm:this.fb.group({
      id: ['']
    })
  });

  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: DialogRef<EditTaskComponent>, private appService:AppService) {
  }

  ngOnInit(): void {
  }

  onClose() {
    this.dialogRef.close();
  }

  onSaveTask() {
    this.dialogRef.close()
  }

  onGetUser(){
    this.appService.getUsers().subscribe(
      (response)=>{
        this.users = response
      },
      ()=>{}
    )
  }

}
