import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/orders/order.service';
import { IOrder, User } from '../../interfaces/IOrder';
import { UserService } from 'src/app/services/users/user.service';
import { createOrderForm } from 'src/app/forms/orders/order-form';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css']
})
export class OrderDialogComponent implements OnInit {

  orderForm: FormGroup;
  users: User[] = [];

  constructor(
    public dialogRef: MatDialogRef<OrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private orderService: OrderService
  ) {
    this.orderForm = createOrderForm(fb, data);
  }

  ngOnInit(): void {
    this.orderService.getUsers().subscribe(users => {
      this.users = users;
    });
    this.initializeForm();
  }

  initializeForm(): void {
    if (this.data.order && this.data.order.user) {
      this.orderForm.patchValue({
        userId: this.data.order.user.id,
        total: this.data.order.total,
        discount: this.data.order.discount
      });
    }
  }

  onSave(): void {
    const orderData: IOrder = {
      user: {
        id: this.orderForm.get('userId')?.value
      },
      total: this.orderForm.get('total')?.value,
      discount: this.orderForm.get('discount')?.value
    };

    if (this.data.order && this.data.order.id) {
      this.orderService.updateOrder(this.data.order.id, orderData).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      this.orderService.createOrder(orderData).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
