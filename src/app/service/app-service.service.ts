import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Task } from '../model/task';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { User } from '../model/user';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  readonly URL = environment.URL;

  constructor(private http: HttpClient, private auth: AuthService) { }


  addTask(task: Task): Observable<Task> {

    return this.http.post<Task>(`${this.URL}/addTask`, task, { headers: this.auth.createAuthorizationHeaders() })
      .pipe(
        tap(response => console.log('Task added:', response))
      );
  }

  getTask(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.URL}/tasks`, {
      headers: this.auth.createAuthorizationHeaders()
    })
      .pipe(
        tap(console.log)
      )
  }

  

  tasks$ = <Observable<Task[]>>
    this.http.get<Task>(`${this.URL}`, {
      headers: this.auth.createAuthorizationHeaders()
    }).pipe(
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
    return this.http.get<User[]>(`${this.URL}/user`, { headers: this.auth.createAuthorizationHeaders() }).pipe(
      tap(console.log)
    )
  }


  logout$ = <Observable<string>>
    this.http.post<string>(`http://localhost:8081/logout`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${localStorage.getItem('token')
          }`
      })
    }).pipe(
      tap(console.log)
    )

  handlerError(handlerError: HttpErrorResponse): Observable<never> {
    console.log("An error occured - Error code %s ", handlerError.status)
    return throwError(() => `An error occured - Error code :${handlerError.status}`);
  }
}
