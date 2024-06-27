import { Routes } from '@angular/router';
import { Error404Component } from './errors/error404/error404.component';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./main/main.routes').then((c) => c.mainRoutes)
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes').then((c) => c.authRoutes)
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: "page-not-found",
    },
    {
        path: 'page-not-found',
        loadComponent: () => import('./errors/error404/error404.component').then((c) => c.Error404Component)
    }
];
