import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { HelpComponent } from './components/help/help.component';
import { ProductCatalogComponent } from './components/product-catalog/product-catalog.component';
import { UserConfigComponent } from './components/dashboard/user-config/user-config.component';
import { UserOrdersComponent } from './components/dashboard/user-orders/user-orders.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/home' },
    { path: 'home', component: HomeComponent },
    { path: 'cart', component: CartComponent },
    { path: 'help', component: HelpComponent },
    { path: 'product/:id', component: ProductComponent },
    { path: 'products', pathMatch: 'full', redirectTo: 'products/' },
    { path: 'products/:category', component: ProductCatalogComponent },
    { path: 'user/config', component: UserConfigComponent },
    { path: 'user/orders', component: UserOrdersComponent }
];
