import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ProfileComponent } from './profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { authGuard } from '../auth/auth.guard';
import { AddTaskComponent } from './manage-task/add-task/add-task.component';

const routes: Routes = [
  {
    path: 'admin',
    component: SideBarComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        children: [
          {
            path: 'profile',
            component: ProfileComponent
          },
          {
            path: 'addTask',
            component: AddTaskComponent
          },
          {
            path: '',
            component: AdminDashboardComponent
          },

          
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
