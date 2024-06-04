import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderItemService } from 'src/app/services/orders/order-item.service';
import { OrderItemDialogComponent } from '../order-item-dialog/order-item-dialog.component';

@Component({
  selector: 'app-order-item-management',
  templateUrl: './order-item-management.component.html',
  styleUrls: ['./order-item-management.component.css']
})
export class OrderItemManagementComponent implements OnInit {

  orderItems: any[] = [];
  displayedColumns: string[] = ['id', 'order', 'product', 'quantity', 'price', 'actions'];

  constructor(private orderItemService: OrderItemService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadOrderItems();
  }

  loadOrderItems(): void {
    this.orderItemService.getOrderItems().subscribe(orderItems => {
      this.orderItems = orderItems;
      console.log(orderItems)
    });
  }

  openCreateOrderItemDialog(): void {
    const dialogRef = this.dialog.open(OrderItemDialogComponent, {
      width: '400px',
      data: { orderItem: {} }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadOrderItems();
      }
    });
  }

  openEditOrderItemDialog(orderItem: any): void {
    const dialogRef = this.dialog.open(OrderItemDialogComponent, {
      width: '400px',
      data: { orderItem }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadOrderItems();
      }
    });

  }

  deleteOrderItem(id: number): void {
    this.orderItemService.deleteOrderItem(id).subscribe(() => {
      this.loadOrderItems();
    });
  }
}
