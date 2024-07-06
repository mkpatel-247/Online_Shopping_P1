import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main.component';
import { authGuard } from '../shared/guard/auth.guard';

export const mainRoutes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'home'
            },
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'about-us',
                loadComponent: () => import('../pages/about-us/about-us.component').then((c) => c.AboutUsComponent)
            },
            {
                path: 'help',
                loadComponent: () => import('../pages/help/help.component').then((c) => c.HelpComponent)
            },
            {
                path: 'faq',
                loadComponent: () => import('../pages/faq/faq.component').then((c) => c.FaqComponent)
            },
            {
                path: 'cart',
                loadComponent: () => import('../main/cart/cart.component').then((c) => c.CartComponent)
            },
            {
                path: 'checkout',
                canActivate: [authGuard],
                loadComponent: () => import('../main/checkout/checkout.component').then((c) => c.CheckoutComponent)
            },
            {
                path: 'orders',
                canActivate: [authGuard],
                loadComponent: () => import('../main/orders/orders.component').then((c) => c.OrdersComponent)
            },
            {
                path: 'orders/order-details/:id',
                canActivate: [authGuard],
                loadComponent: () => import('../main/orders/order-list/order-list.component').then((c) => c.OrderListComponent)
            },
            {
                path: 'contact',
                loadComponent: () => import('../pages/contact/contact.component').then((c) => c.ContactComponent),
                data: [
                    {
                        pageTitle: 'Contact',
                        linkList: [
                            { label: 'Home', link: '/home' },
                            { label: 'Contact', link: '/contact' }
                        ]
                    }
                ]
            },
            {
                path: 'wishlist',
                loadComponent: () => import('../main/wishlist/wishlist.component').then((c) => c.WishlistComponent)
            },
            {
                path: 'product',
                loadChildren: () => import('./products/products.routes').then((c) => c.productsRoutes)
            },
            {
                path: 'profile',
                canActivate: [authGuard],
                loadComponent: () => import('./user-profile/user-profile.component').then((c) => c.UserProfileComponent)
            }
        ]
    },

];
