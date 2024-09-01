import { Routes } from '@angular/router';
import { ProductsComponent } from './products.component';

export const productsRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./products.component').then((c) => c.ProductsComponent),
    },
    {
        path: 'details/:id',
        loadComponent: () => import('../products/product-detail/product-detail.component').then((c) => c.ProductDetailComponent),
    }
];
