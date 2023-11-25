import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Task } from '../model/task';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  readonly URL = environment.URL;

  constructor(private http: HttpClient, private auth: AuthService) { }

 

  loadTask(userId: number, filter = '', sortOrder = 'asc',
    pageNumber = 0, pageSize = 3): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.URL}`, {
      headers: this.auth.createAuthorizationHeaders(),
      params: new HttpParams()
        .set('userId', userId.toString())
        .set('filter', filter)
        .set('sortOrder', sortOrder)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    })
      .pipe(
        map(res => res)
      );
  }

  getTasks():Observable<Task[]>{
    return this.http.get<Task[]>(`${this.URL}`,{headers: this.auth.createAuthorizationHeaders()});
  }

  getTaskById(taskId:number):Observable<Task>{
    return this.http.get<Task>(`${this.URL}/${taskId}`,{headers: this.auth.createAuthorizationHeaders()});
  }

  getUser(userId:number):Observable<User>{
    return this.http.get<User>(`${this.URL}/${userId}`,{headers: this.auth.createAuthorizationHeaders()});
  }


}
