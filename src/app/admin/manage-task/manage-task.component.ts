import { Component, AfterViewInit, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { AppService } from 'src/app/service/app-service.service';
import { SnackBarService } from 'src/app/service/snack-bar-service.service';
import { TaskStatus } from 'src/app/model/enume/task-status';
import { DialogService } from 'src/app/service/dialog-service.service';
import { TaskService } from 'src/app/service/task.service';
import { User } from 'src/app/model/user';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Task } from 'src/app/model/task';
import { BehaviorSubject, catchError, finalize, of } from 'rxjs';


@Component({
  selector: 'app-manage-task',
  templateUrl: './manage-task.component.html',
  styleUrls: ['./manage-task.component.css']
})
export class ManageTaskComponent implements AfterViewInit, OnInit, OnDestroy {
  tasks: Task[] | undefined;



  taskStatus = TaskStatus;

  // displayedColumns: string[] = ['id', 'title', 'status', 'name'];
  displayedColumns: string[] = ['id', 'title','status','name'];
  dataSource!: MatTableDataSource<Task>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private appService: AppService, private snackbar: SnackBarService,
    private dialogService: DialogService, private taskService: TaskService,
    private route: ActivatedRoute) {
    this.dataSource = new MatTableDataSource(this.tasks);
  }


  ngOnInit(): void {
    this.taskService.getTasks().pipe(
      catchError(() => of([])),
      finalize(() => { this.loadingSubject.next(false) })
    ).subscribe(
      (tasks) => {
        this.tasks = tasks;
        this.dataSource.data = tasks;
        console.log(tasks)
      }
    )
  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  onRowClicked(_t128: any) {
  }

  ngOnDestroy(): void {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
