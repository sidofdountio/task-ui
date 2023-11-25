import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly URL = environment.URL;

  constructor(private http: HttpClient, private auth: AuthService) { }

  getUser(userId:number):Observable<User>{
    return this.http.get<User>(`${this.URL}/auth/user/${userId}`);
  }


}
