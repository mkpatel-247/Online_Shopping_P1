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
        children: [
            {
                path: '',
                redirectTo: 'product-gallery',
                pathMatch: 'full',
            },
            {
                path: 'product-gallery',
                loadComponent: () => import('../grid-view/grid-view.component').then((c) => c.GridViewComponent),

            },
            {
                path: 'product-list',
                loadComponent: () => import('../list-view/list-view.component').then((c) => c.ListViewComponent),
            }
        ]
    },
];
