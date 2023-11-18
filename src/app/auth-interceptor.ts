import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { Token } from '@angular/compiler';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (request.url === 'http://localhost:8081/api/v1/task/auth/authenticate') {
      // Bypass the interceptor and allow the request to proceed unchanged
      return next.handle(request);
    }
    if (request.url === 'http://localhost:8081/api/v1/task/auth/register') {
      // Bypass the interceptor and allow the request to proceed unchanged
      return next.handle(request);
    } if (request.url === 'http://localhost:8081/logout') {
      // Bypass the interceptor and allow the request to proceed unchanged
      return next.handle(request);
    } if (request.url === 'http://localhost:8081/api/v1/task/auth/isTokenValid/') {
      // Bypass the interceptor and allow the request to proceed unchanged
      return next.handle(request);
    }


    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token'
      })
    };

    const TOKEN = localStorage.getItem('API_TOKEN')
    const authReq = request.
      clone(
        {
          headers: request.headers.set('Authorization', `Bearer ${localStorage.getItem('API_TOKEN')}`)
        });
    request.clone({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + TOKEN
      })

    })
    return next.handle(authReq);
  }
}
