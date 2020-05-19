import { Routes } from '@angular/router';
import { HomeComponent } from './Home/Home.component';
import { LoginComponent } from './Login/Login.component';
import { RegisterComponent } from './Register/Register.component';
import { AuthGuard } from './_guards/auth.guard';
import { RegisterConfirmationComponent } from './Register/register-confirmation/register-confirmation.component';

export const appRoutes: Routes = [
    {path: '', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'rejestracja', component: RegisterComponent},
    {path: 'potwierdzenie', component: RegisterConfirmationComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'}
]