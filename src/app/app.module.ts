import { NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogMessageComponent } from './message/dialog-message/dialog-message.component';
import { SnackBarComponent } from './message/snack-bar/snack-bar.component';
import { ErrorComponent } from './message/error/error.component';
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { MatButtonModule } from '@angular/material/button'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatIconModule } from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker'; 




@NgModule({
  declarations: [
    AppComponent,
    DialogMessageComponent,
    SnackBarComponent,
    ErrorComponent,
    PageNotFoundComponent,
  ],
  imports: [
    MatDatepickerModule,
    BrowserModule,
    MatIconModule,
    MatSnackBarModule,
    RouterModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    AuthModule,
    AdminModule,
    AppRoutingModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
