import { Component, AfterViewInit, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Task } from 'src/app/model/task';
import { AppService } from 'src/app/service/app-service.service';
import { SnackBarService } from 'src/app/service/snack-bar-service.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TaskStatus } from 'src/app/model/enume/task-status';
import { Priority } from 'src/app/model/enume/priority';
import { AddTaskComponent } from './add-task/add-task.component';
import { HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataState } from 'src/app/model/enume/data-state';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { DialogService } from 'src/app/service/dialog-service.service';
import { AppState } from 'src/app/model/app-state';
import { CustormResponse } from 'src/app/model/custorm-response';
import { User } from 'src/app/model/user';
import { TaskRequest } from 'src/app/model/task-request';


@Component({
  selector: 'app-manage-task',
  templateUrl: './manage-task.component.html',
  styleUrls: ['./manage-task.component.css']
})
export class ManageTaskComponent implements OnInit, AfterViewInit, OnDestroy {

  user!: User;
  taskById!: Task | undefined;
  taskList: Task[] = [];
  dataSujet$ = new BehaviorSubject<Task[]>([]);
  tasks: Task[] = [];
  ELEMENT_DATA: Task[] = [];
  task: TaskRequest = {
    title: '',
    status: TaskStatus.PENDING,
    description: '',
    priority: Priority.MEDIUM,
    dueDate: '',
    user: this.user
  };

  displayedColumns: string[] = ['id', 'title', 'status', 'priority', 'description', 'dueDate', 'name', 'action']
  dataSource = new MatTableDataSource<Task>([]);
  appSate$!: Observable<Task[]>;
  appSates$!: Observable<AppState<CustormResponse>>;
  state: DataState = DataState.LOADING_STATE;
  DataState = DataState;
  taskStatus = TaskStatus;
  priority = Priority;
  title: any;
  status: any;
  description: any;
  dueDate: any;

  constructor(private appService: AppService, private snackbar: SnackBarService,
    private dialogService: DialogService) { }


  ngOnInit(): void {
    this.appSate$ = this.appService.tasks$.pipe(
      tap(
        (response) => {
          this.dataSource.data = response;
          this.dataSujet$.next(response);
          this.taskList = response;
          this.state = DataState.LOADING_STATE
        },
        () => {
          this.state = DataState.ERROR_STATE
        },
        () => {
          this.state = DataState.LOADED_STATE;
          this.snackbar.openSnackBar("Task Loaded","X");
        }
      )
    );
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onGetTasks() {
    this.appService.getTask().subscribe(
      () => {
        this.snackbar.openSnackBar("Task Loaded", "Close");
      },
      (error: HttpErrorResponse) => {
        this.snackbar.openSnackBar("Error Du Task Loaded", "Close");
      }
    )
  }

  


  onEditTask(id: number) {
    for (let task of this.taskList) {
      if (task.id === id) {
        this.taskById = task;
      }
    }
    
  }


  onUpdate(taskToUpdate: Task) {
    this.appService.editeProduct(taskToUpdate)
      .subscribe(
        () => {
          this.snackbar.openSnackBar("Task edited successfuly", "close");
          this.onGetTasks();
        },
        (error: HttpErrorResponse) => {
          console.log("Error: %s", error.status);
          this.snackbar.openSnackBar("And error occured", "close");
        }
      )
  }

  onDeleteTask(arg0: any) {
    this.dialogService.confirmMessage("Do you want to this entry");
  }

  ngOnDestroy(): void {

  }


}
