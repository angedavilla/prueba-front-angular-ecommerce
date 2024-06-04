import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/orders/order.service';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';
import { IOrder } from '../../interfaces/IOrder';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {

  orderForm: FormGroup;

  orders: IOrder[] = [];
  displayedColumns: string[] = ['id', 'user', 'userid','total', 'discount', 'actions'];
  

  constructor(private orderService: OrderService,
     public dialog: MatDialog,
     private fb: FormBuilder
    ) {
      this.orderForm = this.fb.group({
        userId: ['', Validators.required], // Empty userId
        total: ['', Validators.required],
        discount: ['', Validators.required],
        startTime: ['', Validators.required],
        endTime: ['', Validators.required],
        isRandomOrder: [false, Validators.required],
        orderItems: this.fb.array([])
      });
     }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
      console.log(orders)
    });
  }

  openCreateOrderDialog(): void {
    const dialogRef = this.dialog.open(OrderDialogComponent, {
      width: '400px',
      data: { order: {} }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadOrders();
      }
    });
  }

  openEditOrderDialog(order: IOrder): void {
    const dialogRef = this.dialog.open(OrderDialogComponent, {
      width: '400px',
      data: { order: order }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadOrders();
      }
    });
  }

  get orderItems() {
    return this.orderForm.get('orderItems') as FormArray;
  }

  addItem() {
    this.orderItems.push(this.fb.group({
      productId: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required]
    }));
  }

  removeItem(index: number) {
    this.orderItems.removeAt(index);
  }

  saveOrder() {
    const formValue = this.orderForm.value;
    const order = {
      user: {
        id: formValue.userId
      },
      total: formValue.total,
      discount: formValue.discount,
      orderItems: formValue.orderItems.map((item: any) => ({
        product: {
          id: item.productId
        },
        quantity: item.quantity,
        price: item.price
      }))
    };
    let startTime = formValue.startTime;
    let endTime = formValue.endTime;
    const isRandomOrder = formValue.isRandomOrder;

    // Si la opción de pedido aleatorio está seleccionada, establecer startTime y endTime en null
    if (isRandomOrder) {
      startTime = null;
      endTime = null;
    }

    this.orderService.saveOrder(order, startTime, endTime, isRandomOrder).subscribe(response => {
      console.log('Order saved:', response);
    });
  }

  deleteOrder(id: number): void {
    this.orderService.deleteOrder(id).subscribe(() => {
      this.loadOrders();
    });
  }

}
