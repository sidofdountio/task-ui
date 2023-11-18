import { DialogRef } from '@angular/cdk/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Priority } from 'src/app/model/enume/priority';
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

  taskForm = this.fb.group({
    title: this.fb.nonNullable.control("",{
      validators:[Validators.required]
    }),
    description: ['', Validators.required],
    status: ['', Validators.required],
    priority: ['', Validators.required],
    dueDate: ['', Validators.required],
  });


  constructor(private fb: FormBuilder, private appService: AppService,
    private snackbar: SnackBarService,private router:Router) {
  }


  ngOnInit(): void {
  }

  onSubmit() {
    this.addTask(this.taskForm.value as TaskRequest);
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
