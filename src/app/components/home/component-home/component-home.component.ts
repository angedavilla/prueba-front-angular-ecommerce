import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrderService } from 'src/app/services/orders/order.service';
import { ProductService } from 'src/app/services/products/product.service';
import { CustomService } from '../../../services/customs/custom.service';

@Component({
  selector: 'app-component-home',
  templateUrl: './component-home.component.html',
  styleUrls: ['./component-home.component.css']
})
export class ComponentHomeComponent implements OnInit {

  username: string = '';
  activeProducts: any[] = [];
  topSellingProducts: any[] = [];
  frequentCustomers: any[] = [];

  constructor(
    private authService: AuthService,
    private customService: CustomService
  ) { }

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.loadActiveProducts();
    this.loadTopSellingProducts();
    this.loadFrequentCustomers();
  }

  loadActiveProducts(): void {
    this.customService.getActiveProducts().subscribe(products => {
      this.activeProducts = products;
    });
  }

  loadTopSellingProducts(): void {
    this.customService.getTopSellingProducts().subscribe(products => {
      this.topSellingProducts = products;
    });
  }

  loadFrequentCustomers(): void {
    this.customService.getFrequentCustomers().subscribe(customers => {
      this.frequentCustomers = customers;
    });
  }

}
