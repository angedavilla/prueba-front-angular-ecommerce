import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { createOrderItemForm } from 'src/app/forms/orders/order-item-form';
import { OrderItemService } from 'src/app/services/orders/order-item.service';
import { IOrderItem } from '../../interfaces/IOrderItem';
import { OrderService } from '../../../services/orders/order.service';
import { IOrder } from '../../interfaces/IOrder';
import { IProductItem } from '../../interfaces/IProductItem';

@Component({
  selector: 'app-order-item-dialog',
  templateUrl: './order-item-dialog.component.html',
  styleUrls: ['./order-item-dialog.component.css']
})
export class OrderItemDialogComponent implements OnInit {

  orderItemForm: FormGroup;
  errorMessage: string | null = null;
  orders!: IOrder[];
  products!: IProductItem[];

  constructor(
    public dialogRef: MatDialogRef<OrderItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private orderItemService: OrderItemService,
    private OrderService: OrderService,
  ) { 
    this.orderItemForm = createOrderItemForm(fb, data);
  }

  ngOnInit(): void {
    this.OrderService.getOrders().subscribe(orders => {
      this.orders = orders;
    });

    this.orderItemService.getProducts().subscribe(products => {
      this.products = products;
      console.log(products)
    });
    this.initializeForm();
  }

  initializeForm(): void {
    if (this.data.orderItem) {
      this.orderItemForm.patchValue({
        orderId: this.data.orderItem.order?.id,
        productId: this.data.orderItem.product?.id,
        quantity: this.data.orderItem.quantity,
        price: this.data.orderItem.price
      });
    }
  }

  onSave(): void {
    const orderItemData: IOrderItem = {
      order: {
        id: this.orderItemForm.get('orderId')?.value
      },
      product: {
        id: this.orderItemForm.get('productId')?.value
      },
      quantity: this.orderItemForm.get('quantity')?.value,
      price: this.orderItemForm.get('price')?.value
    };

    if (this.data.orderItem.id) {
      this.orderItemService.updateOrderItem(this.data.orderItem.id, orderItemData).subscribe(
        () => this.dialogRef.close(true),
        error => this.errorMessage = error
      );
    } else {
      this.orderItemService.createOrderItem(orderItemData).subscribe(
        () => this.dialogRef.close(true),
        error => this.errorMessage = error
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
