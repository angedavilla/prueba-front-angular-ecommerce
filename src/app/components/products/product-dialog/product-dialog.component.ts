import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/products/product.service';
import { IProduct } from '../../interfaces/IProduct';
import { createProductForm } from 'src/app/forms/products/product-form';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {

  productForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IProduct,
    private fb: FormBuilder,
    private productService: ProductService
  ) { 
    this.productForm = createProductForm(fb, data);
  }

  ngOnInit(): void {
  }

  onSave(): void {
    if (this.data.product.id) {
      this.productService.updateProduct(this.data.product.id, this.productForm.value).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      this.productService.saveProduct(this.productForm.value).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
