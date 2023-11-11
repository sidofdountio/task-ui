import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core'

import { AdminRoutingModule } from './admin-routing.module';
import { SideBarComponent } from './side-bar/side-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { ManageTaskComponent } from './manage-task/manage-task.component';
import { ProfileComponent } from './profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { FormsModule, ReactiveFormsModule ,FormControl} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatDatepickerModule} from '@angular/material/datepicker'; 




import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';


import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {  MatSortModule } from '@angular/material/sort';
import { AddTaskComponent } from './manage-task/add-task/add-task.component';
import { ErrorComponent } from './message/error/error.component';
import { SpinnerComponent } from './message/spinner/spinner.component';
import { EditTaskComponent } from './manage-task/edit-task/edit-task.component';
import { DialogComponent } from './message/dialog/dialog.component';

@NgModule({
  declarations: [
    SideBarComponent,
    AdminDashboardComponent,
    ManageTaskComponent,
    ProfileComponent,
    PageNotFoundComponent,
    ErrorPageComponent,
    AddTaskComponent,
    ErrorComponent,
    SpinnerComponent,
    EditTaskComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatSelectModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    AdminRoutingModule
    
  ]
})
export class AdminModule { }
