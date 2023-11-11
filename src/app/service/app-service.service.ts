import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AppService {


  readonly URL = environment.URL;

  constructor(private http: HttpClient) { }


  addTask(task: Task): Observable<Task> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<Task>(`${this.URL}/addTask`, task, { headers })
    .pipe(
      tap(response => console.log('Task added:', response))
    );
  }

  getTask(): Observable<Task[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<Task[]>(`${this.URL}`,{headers})
      .pipe(
        tap(console.log)
      )
  }

  tasks$ = <Observable<Task[]>>
    this.http.get<Task>(`${this.URL}`, {
      headers: new HttpHeaders({
        "Authorization":`Bearer ${localStorage.getItem('token')
      }`})
    }).pipe(
        tap(console.log),
        catchError(this.handlerError)
      );


  taskList$ = <Observable<Task[]>>
    this.http.get<Task>(`${this.URL}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );


  editeProduct(taskToUpdate: Task) {
    return this.http.put<Task>(`${this.URL}/editeTask`, taskToUpdate)
      .pipe(
        tap(console.log)
      );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.URL}/user`,{
      headers: new HttpHeaders({
        "Authorization":`Bearer ${localStorage.getItem('token')
      }`})
    }).pipe(
        tap(console.log)
      )
  }

  handlerError(handlerError: HttpErrorResponse): Observable<never> {
    console.log("An error occured - Error code %s ", handlerError.status)
    return throwError(() => `An error occured - Error code :${handlerError.status}`);
  }
}
