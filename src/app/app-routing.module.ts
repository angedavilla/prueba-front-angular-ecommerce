import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentLoginComponent } from './components/home/component-login/component-login.component';
import { AuthGuard } from './guards/auth.guard';
import { ComponentHomeComponent } from './components/home/component-home/component-home.component';
import { UserManagementComponent } from './components/users/user-management/user-management.component';
import { RoleManagementComponent } from './components/roles/role-management/role-management.component';
import { ProductsManagementComponent } from './components/products/products-management/products-management.component';
import { OrderManagementComponent } from './components/orders/order-management/order-management.component';
import { OrderItemManagementComponent } from './components/orders/order-item-management/order-item-management.component';
import { InventoryManagementComponent } from './components/inventories/inventory-management/inventory-management.component';
import { RolesUserManagementComponent } from './components/roles/roles-user-management/roles-user-management.component';


const routes: Routes = [
  { path: 'login', component: ComponentLoginComponent },
  { path: 'home', component: ComponentHomeComponent, canActivate: [AuthGuard] },
  { path: 'user-management', component: UserManagementComponent, canActivate: [AuthGuard] },
  { path: 'role-management', component: RoleManagementComponent, canActivate: [AuthGuard] },
  { path: 'products-management', component: ProductsManagementComponent, canActivate: [AuthGuard] },
  { path: 'order-management', component: OrderManagementComponent, canActivate: [AuthGuard] },
  { path: 'order-items', component: OrderItemManagementComponent, canActivate: [AuthGuard] },
  { path: 'inventory-management', component: InventoryManagementComponent, canActivate: [AuthGuard] },
  { path: 'user-roles', component: RolesUserManagementComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
