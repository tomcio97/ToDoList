import { Routes } from '@angular/router';
import { HomeComponent } from './Home/Home.component';
import { LoginComponent } from './Login/Login.component';
import { RegisterComponent } from './Register/Register.component';
import { AuthGuard } from './_guards/auth.guard';
import { RegisterConfirmationComponent } from './Register/register-confirmation/register-confirmation.component';
import { ResetConfirmComponent } from './ResetPassword/ResetConfirm/ResetConfirm.component';
import { ResetPasswordComponent } from './ResetPassword/ResetPassword.component';

export const appRoutes: Routes = [
    {path: '', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'rejestracja', component: RegisterComponent},
    {path: 'potwierdzenie', component: RegisterConfirmationComponent},
    {path: 'resetpassword', component: ResetConfirmComponent},
    {path: 'reset', component: ResetPasswordComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'}
]