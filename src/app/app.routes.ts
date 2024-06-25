import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        loadComponent: () => import('./main/home/home.component').then((c) => c.HomeComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./auth/login/login.component').then((c) => c.LoginComponent)
    },
    {
        path: 'product',
        loadChildren: () => import('./main/products/products.routes').then((c) => c.productsRoutes)
    },
];
