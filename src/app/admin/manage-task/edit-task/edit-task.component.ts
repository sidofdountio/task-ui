import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Priority } from 'src/app/model/enume/priority';
import { TaskStatus } from 'src/app/model/enume/task-status';
import { Task } from 'src/app/model/task';
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
    assignee: undefined
  }
  FormTask!: FormGroup;
  users!: User[];
  startDate: any;
  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: DialogRef<EditTaskComponent>, private appService:AppService) {
      this.FormTask =
      this.fb.group({
        title: [this.taskToSave.title, Validators.required],
        description: [this.taskToSave.description, Validators.required],
        status: [this.taskToSave.status, Validators.required],
        priority: [this.taskToSave.priority, Validators.required],
        dueDate: [this.taskToSave.dueDate, Validators.required],
        userForm: this.fb.group({
          id: [this.taskToSave.user,Validators.required]
        }),
      });
  }

  ngOnInit(): void {
    
    
  }
  onClose() {
    this.dialogRef.close();
  }
  onSaveTask() {
    this.dialogRef.close(this.FormTask.value)
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
