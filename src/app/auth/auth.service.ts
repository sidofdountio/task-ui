import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { AuthenticationRequest } from '../model/authentication-request';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthenticationResponse } from '../model/authentication-response';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../message/snack-bar/snack-bar.component';
import { SnackBarData } from '../model/snack-bar-data';
import { RegisteRequester } from '../model/register-request';
import { Route, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService{
  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';
  private durationInSecond: number = 5;
  snackBarData: SnackBarData = {
    message: '',
    action: ''
  }
  private readonly baseUrl: string = environment.URL;
  isLoggedIn = true;
  private readonly API_TOKEN: string = 'API_TOKEN';
  tokenValid$ = new BehaviorSubject<boolean>(false);
  


  constructor(private http: HttpClient, private _snackBar: MatSnackBar,private router:Router) { }



  login$ = (userRequest: AuthenticationRequest) => <Observable<AuthenticationResponse>>this.http
    .post<AuthenticationResponse>(`${this.baseUrl}/auth/authenticate`, userRequest)
    .pipe(
      map(response => {
        const token = response.token;
        localStorage.setItem("username", userRequest.email);
        console.log(response.token);
        this.setAuthToken(token as string);
        return response;
      }),
      catchError(this.handlerError)
    );

  register$ = (userRequest: RegisteRequester) => <Observable<AuthenticationResponse>>this.http
    .post<AuthenticationResponse>(`${this.baseUrl}/auth/register`, userRequest)
    .pipe(
      map(response => {
        const token = response.token;
        console.log(response.token);
        this.setAuthToken(token as string);
        return response;
      }),
      catchError(this.handlerError)
    );


  setAuthToken(token: string): void {
    localStorage.setItem(this.API_TOKEN, token);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.API_TOKEN);
  }

  // Add other HTTP methods as needed (e.g., put, delete, etc.)
  createAuthorizationHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    const isTokenExpired = this.isAuthenticated();
    if (!isTokenExpired){
      httpOptions.headers = httpOptions.headers.set('Authorization',`Bearer ${token}`)
    }
    return httpOptions.headers;
  }

  // valid token
  isTokenExpired$ = (token: string | null) => <Observable<boolean>>
    this.http.get<boolean>(`${this.baseUrl}/auth/isTokenValid/${token}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  tokenValid(token: string | null): boolean {
    this.isTokenExpired$(token).pipe(
      map(response => {
        this.openSnackBarCustorm("This token its expired", "OK");
        console.log("auth method its work")
        this.tokenValid$.next(response);
        tap(console.log)
      }),
      catchError((error: string) => {
        console.log("error " + error)
        return of(error)
      })
    )
    return this.tokenValid$.value;
  }

  isAuthenticated(): boolean {
    const token = this.getAuthToken();
    if ((token === null) && (!this.tokenValid$.value)) {
      this.router.navigate(['/login'])
      return false;
    }
    return true;
  }

  logout$ = <Observable<string>>
    this.http.post<string>(`http://localhost:8081/logout`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${localStorage.getItem('API_TOKEN')
          }`
      })
    }).pipe(
      tap(console.log)
    )

  openSnackBarCustorm(message: string, action: string) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: {
        message,
        action,
      },
      duration: this.durationInSecond * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  handlerError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => "error :" + error.status)
  }
}
