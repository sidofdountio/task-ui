import {Injectable, inject} from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import {Observable} from "rxjs";
import { TaskService } from './task.service';
import { Task } from '../model/task';

@Injectable()
export class TaskResolver implements Resolve<Task[]> {
  constructor(private taskService: TaskService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Task[]> {
    const userId = parseInt(route.params['userId']); // Assuming userId is a route parameter
    const filter = ''; // Set your desired filter value
    const sortOrder = 'asc'; // Set your desired sort order
    const pageNumber = 0; // Set your desired page number
    const pageSize = 3; // Set yo
    // Fetch the task data using the taskService
    return this.taskService.loadTask(userId, filter, sortOrder, pageNumber, pageSize);
  }
}