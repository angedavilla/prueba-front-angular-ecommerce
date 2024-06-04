import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentLoginComponent } from './components/home/component-login/component-login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { ComponentHomeComponent } from './components/home/component-home/component-home.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserManagementComponent } from './components/users/user-management/user-management.component';
import { UserDialogComponent } from './components/users/user-dialog/user-dialog.component';
import { RoleManagementComponent } from './components/roles/role-management/role-management.component';
import { RoleDialogComponent } from './components/roles/role-dialog/role-dialog.component';
import { RoleService } from './services/roles/role.service';
import { UserService } from './services/users/user.service';
import { ProductsManagementComponent } from './components/products/products-management/products-management.component';
import { ProductDialogComponent } from './components/products/product-dialog/product-dialog.component';
import { ProductService } from './services/products/product.service';
import { OrderManagementComponent } from './components/orders/order-management/order-management.component';
import { OrderDialogComponent } from './components/orders/order-dialog/order-dialog.component';
import { OrderItemManagementComponent } from './components/orders/order-item-management/order-item-management.component';
import { OrderItemDialogComponent } from './components/orders/order-item-dialog/order-item-dialog.component';
import { OrderService } from './services/orders/order.service';
import { OrderItemService } from './services/orders/order-item.service';
import { InventoryManagementComponent } from './components/inventories/inventory-management/inventory-management.component';
import { InventoryDialogComponent } from './components/inventories/inventory-dialog/inventory-dialog.component';
import { InventoryService } from './services/inventories/inventory.service';
import { MatSelectModule } from '@angular/material/select';
import { RolesUserManagementComponent } from './components/roles/roles-user-management/roles-user-management.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    ComponentLoginComponent,
    ComponentHomeComponent,
    NavbarComponent,
    UserManagementComponent,
    UserDialogComponent,
    RoleManagementComponent,
    RoleDialogComponent,
    ProductsManagementComponent,
    ProductDialogComponent,
    OrderManagementComponent,
    OrderDialogComponent,
    OrderItemManagementComponent,
    OrderItemDialogComponent,
    InventoryManagementComponent,
    InventoryDialogComponent,
    RolesUserManagementComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatTableModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSnackBarModule,
    MatIconModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:8080'],
        disallowedRoutes: ['localhost:8080/api/auth/login']
      }
    })
  ],
  providers: [
    AuthGuard,
    AuthService,
    RoleService,
    UserService,
    ProductService,
    OrderService,
    OrderItemService,
    InventoryService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
