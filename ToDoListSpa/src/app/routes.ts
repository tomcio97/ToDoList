import { Routes } from '@angular/router';
import { HomeComponent } from './Home/Home.component';
import { LoginComponent } from './Login/Login.component';
import { RegisterComponent } from './Register/Register.component';
import { AuthGuard } from './_guards/auth.guard';
import { RegisterConfirmationComponent } from './Register/register-confirmation/register-confirmation.component';
import { ResetConfirmComponent } from './ResetPassword/ResetConfirm/ResetConfirm.component';
import { ResetPasswordComponent } from './ResetPassword/ResetPassword.component';
import { DoneComponent } from './Done/Done.component';
import { AddTaskComponent } from './AddTask/AddTask.component';
import { ToDoComponent } from './ToDo/ToDo.component';
import { EditTaskComponent } from './EditTask/EditTask.component';

export const appRoutes: Routes = [
    {path: '', component: HomeComponent, canActivate: [AuthGuard], children: [
        {path: '', component: ToDoComponent},
        {path: 'zrobione', component: DoneComponent},
        {path: 'dodawanie', component: AddTaskComponent},
        {path: 'edycja/:id', component: EditTaskComponent},
    ] },
    {path: 'login', component: LoginComponent},
    {path: 'rejestracja', component: RegisterComponent},
    {path: 'potwierdzenie', component: RegisterConfirmationComponent},
    {path: 'resetpassword', component: ResetConfirmComponent},
    {path: 'reset', component: ResetPasswordComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'}
]