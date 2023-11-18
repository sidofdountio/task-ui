import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay,tap } from 'rxjs/operators';
import { AppService } from 'src/app/service/app-service.service';
import { Task } from 'src/app/model/task';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  appSate$: Observable<Task[]> | undefined;
  currentDate:Date | undefined;
  notifItem:any;
  notification:boolean = false;

  constructor(private appService:AppService,private router:Router){}
    
  ngOnInit(): void {
    this.appSate$ = this.appService.tasks$.pipe(
      tap(
        (response) => {
          this.currentDate = new Date();
          for (let task of response){
            if(task.dueDate === this.currentDate){
              this.notifItem = 1;
              this.notification = true;
            }
          }
          // this.dataSource.data = response;
         
        },
        () => {
          // this.state = DataState.ERROR_STATE
        },
        () => {
          // this.state = DataState.LOADED_STATE
        }
      )

    );
  }

  logout() {
    this.appService.logout$.subscribe(
      ()=>{
        localStorage.clear();
        this.router.navigate(["/login"])
      }
    )
  }
}
