import { Routes } from '@angular/router';
import { LoginComponent }  from './login/login';
import { SignupComponent } from './signup/signup';

export const AUTH_ROUTES: Routes = [
  { path: 'login',  component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];
