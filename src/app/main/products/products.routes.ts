import { Routes } from '@angular/router';
import { ProductsComponent } from './products.component';

export const productsRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./products.component').then((c) => c.ProductsComponent),
        data: [
            {
                pageTitle: 'Product',
                linkList: [
                    { label: 'Home', link: '/home' },
                    { label: 'Products', link: '/product' }
                ]
            }
        ],
    },
    {
        path: ':id',
        component: ProductsComponent,
        data: [
            {
                pageTitle: 'Product',
                linkList: [
                    { label: 'Home', link: '/home' },
                    { label: 'Products', link: '/product' }
                ]
            }
        ],
    },
    {
        path: 'details/:id',
        loadComponent: () => import('../products/product-detail/product-detail.component').then((c) => c.ProductDetailComponent),
    }
];
