import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SideBarComponent } from './admin/side-bar/side-bar.component';
import { ErrorComponent } from './message/error/error.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/admin', pathMatch: 'full'
  },
  {
    path: "page-not-found",
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: "/page-not-found"
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
