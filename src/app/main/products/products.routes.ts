import { Routes } from '@angular/router';

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
];
