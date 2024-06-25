import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren:() => import('./main/main.routes').then((c) => c.mainRoutes)
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes').then((c) => c.authRoutes)
    },
    {
        path: 'product',
        loadChildren: () => import('./main/products/products.routes').then((c) => c.productsRoutes)
    },
];
