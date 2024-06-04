import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/products/product.service';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';

@Component({
  selector: 'app-products-management',
  templateUrl: './products-management.component.html',
  styleUrls: ['./products-management.component.css']
})
export class ProductsManagementComponent implements OnInit {
  
  products: any[] = [];
  filteredProducts: any[] = [];
  filter = { name: '', minPrice: null, maxPrice: null, active: false };
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'active', 'actions'];
  noProductsFound: boolean = false;

  constructor(private productService: ProductService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.applyFilter();
    });
  }

  applyFilter(): void {
    this.filteredProducts = this.products.filter(product => {
      return (!this.filter.name || product.name.toLowerCase().includes(this.filter.name.toLowerCase())) &&
             (this.filter.minPrice === null || product.price >= this.filter.minPrice) &&
             (this.filter.maxPrice === null || product.price <= this.filter.maxPrice) &&
             (!this.filter.active || product.active);
    });

    this.noProductsFound = this.filteredProducts.length === 0;
  }

  openCreateProductDialog(): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '400px',
      data: { product: {} }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProducts();
      }
    });
  }

  openEditProductDialog(product: any): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '400px',
      data: { product }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProducts();
      }
    });
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }

}
