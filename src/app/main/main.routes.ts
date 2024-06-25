import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main.component';

export const mainRoutes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo:'home'
            },
            {
                path: 'home',
                component:HomeComponent
            },
            {
                path: 'aboutus',
                loadComponent: () => import('../pages/about-us/about-us.component').then((c) => c.AboutUsComponent)
            },
            {
                path: 'help',
                loadComponent: () => import('../pages/help/help.component').then((c) => c.HelpComponent)
            },
            {
                path: 'faq',
                loadComponent: () => import('../pages/faq/faq.component').then((c) => c.FaqComponent)
            }
        ]
    },
   
];
