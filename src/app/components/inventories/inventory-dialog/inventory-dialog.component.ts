import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { createInventoryForm } from 'src/app/forms/inventories/inventory-form';
import { InventoryService } from 'src/app/services/inventories/inventory.service';
import { IInventory } from '../../interfaces/IInvetory';
import { IProductItem } from '../../interfaces/IProductItem';
import { OrderItemService } from 'src/app/services/orders/order-item.service';

@Component({
  selector: 'app-inventory-dialog',
  templateUrl: './inventory-dialog.component.html',
  styleUrls: ['./inventory-dialog.component.css']
})
export class InventoryDialogComponent implements OnInit {

  inventoryForm: FormGroup;
  errorMessage: string | null = null;
  products!: IProductItem[];

  constructor(
    public dialogRef: MatDialogRef<InventoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private orderItemService: OrderItemService,
  ) { 
    this.inventoryForm = createInventoryForm(fb, data);
  }

  ngOnInit(): void {
    this.orderItemService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  
  onSave(): void {
    if (this.inventoryForm.valid) {
      const productId = this.inventoryForm.get('productId')?.value;
      const productName = this.inventoryForm.get('productName')?.value;
      
      this.inventoryService.checkProductExists(productId, productName).subscribe(
        exists => {
          if (exists && !this.data.item.id) {
            this.errorMessage = 'El producto ya existe en el inventario.';
          } else {
            const inventoryData: IInventory = {
              product: {
                id: productId,
                name: productName
              },
              quantity: this.inventoryForm.get('quantity')?.value
            };
            if (this.data.item.id) {
              this.updateInventoryItem(inventoryData);
            } else {
              this.createInventoryItem(inventoryData);
            }
          }
        },
        error => {
          this.errorMessage = error;
        }
      );
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
    }
  }

  createInventoryItem(inventoryData: IInventory): void {
    this.inventoryService.createInventoryItem(inventoryData).subscribe(
      () => this.dialogRef.close(true),
      error => this.errorMessage = error
    );
  }

  updateInventoryItem(inventoryData: IInventory): void {
    this.inventoryService.updateInventoryItem(this.data.item.id, inventoryData).subscribe(
      () => this.dialogRef.close(true),
      error => this.errorMessage = error
    );
  }



  onCancel(): void {
    this.dialogRef.close();
  }

}
