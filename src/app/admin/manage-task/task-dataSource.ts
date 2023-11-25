import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { catchError, finalize } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Task } from "src/app/model/task";
import { TaskService } from "src/app/service/task.service";

export class TaskDataSource implements DataSource<Task>{

    private tasksSubject = new BehaviorSubject<Task[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private taskService:TaskService) { }

    connect(collectionViewer: CollectionViewer): Observable<Task[]> {
        return this.tasksSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.loadingSubject.complete();
        this.tasksSubject.complete();
    }

    LoadTask(userId: number, filter: string,
        sortDirection: string, pageIndex: number, pageSize: number) {
        this.loadingSubject.next(true);
        this.taskService.loadTask(userId, filter ='', sortDirection='asc', pageIndex = 0, pageSize = 3).pipe(
            catchError(() => of([])),
            finalize(() => { this.loadingSubject.next(false) })
        ).subscribe(
            (tasks) => {
                this.tasksSubject.next(tasks);
                console.log(tasks)
                
            }
        )
    }

}