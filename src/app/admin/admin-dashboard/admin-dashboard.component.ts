import { Component, OnInit, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AppService } from 'src/app/service/app-service.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{
  private breakpointObserver = inject(BreakpointObserver);

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Insight', cols: 1, rows: 1 },
          { title: 'Task', cols: 1, rows: 1 },
          
        ];
      }

      return [
        { title: 'Insight', cols: 2, rows: 1 },
        { title: 'Task', cols: 2, rows: 2 },
        
      ];
    })
  );
numberTask: any = 0;
currentDate!: string|number|Date;
numberUser: any = 0;
constructor(private appService:AppService) {}

  ngOnInit(): void {
    this.currentDate = new Date();
    this.appService.getTask().subscribe(
      (response)=>{
        this.numberTask = response.length
      }
    );

    this.appService.getUsers().subscribe(
      (response)=>{
        this.numberUser = response.length
      }
    )
  }
  

}
