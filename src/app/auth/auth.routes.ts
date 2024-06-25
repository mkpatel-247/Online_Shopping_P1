import { Routes } from '@angular/router';

export const authRoutes: Routes = [
    {
        path: '',
        pathMatch:'full',
        redirectTo:'login'
    },
    {
        path: 'login',
        loadComponent : () => import('./login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'register',
        loadComponent : () => import('./register/register.component').then(c => c.RegisterComponent)
    },
    {
        path: 'forgotpassword',
        loadComponent : () => import('./forgot-password/forgot-password.component').then(c => c.ForgotPasswordComponent)
    },
    {
        path: 'resetpassword',
        loadComponent : () => import('./reset-password/reset-password.component').then(c => c.ResetPasswordComponent)
    }
];
