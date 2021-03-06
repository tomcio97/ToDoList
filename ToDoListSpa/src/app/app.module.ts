import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './Login/Login.component';
import { RegisterComponent } from './Register/Register.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './Home/Home.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth.guard';
import { AlertifyService } from './_services/alertify.service';
import { RegisterConfirmationComponent } from './Register/register-confirmation/register-confirmation.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { ResetConfirmComponent } from './ResetPassword/ResetConfirm/ResetConfirm.component';
import { ResetPasswordComponent } from './ResetPassword/ResetPassword.component';
import { NavComponent } from './Nav/Nav.component';
import { DoneComponent } from './Done/Done.component';
import { AddTaskComponent } from './AddTask/AddTask.component';
import { TaskCardComponent } from './TaskCard/TaskCard.component';
import { ToDoComponent } from './ToDo/ToDo.component';
import { JwtModule } from '@auth0/angular-jwt';
import { EditTaskComponent } from './EditTask/EditTask.component';

export function tokenGetter()
{
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      RegisterComponent,
      HomeComponent,
      RegisterConfirmationComponent,
      ResetConfirmComponent,
      ResetPasswordComponent,
      NavComponent,
      DoneComponent,
      AddTaskComponent,
      TaskCardComponent,
      ToDoComponent,
      EditTaskComponent
   ],
   imports: [
      HttpClientModule,
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({
         config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
      }),
   ],
   providers: [
      AuthService,
      AuthGuard,
      AlertifyService,
      //ErrorInterceptorProvider
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
