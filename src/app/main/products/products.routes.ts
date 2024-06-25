import { Routes } from '@angular/router';
import { GridViewComponent } from 'src/app/main/grid-view/grid-view.component';
import { ListViewComponent } from '../list-view/list-view.component';

export const productsRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./products.component').then((c) => c.ProductsComponent),
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
                loadComponent: () => import('../list-view/list-view.component').then((c) => ListViewComponent),
            }
        ]
    },
];
