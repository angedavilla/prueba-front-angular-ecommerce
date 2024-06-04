import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InventoryService } from 'src/app/services/inventories/inventory.service';
import { InventoryDialogComponent } from '../inventory-dialog/inventory-dialog.component';

@Component({
  selector: 'app-inventory-management',
  templateUrl: './inventory-management.component.html',
  styleUrls: ['./inventory-management.component.css']
})
export class InventoryManagementComponent implements OnInit {

  inventoryItems: any[] = [];
  displayedColumns: string[] = ['id', 'product', 'quantity', 'actions'];

  constructor(private inventoryService: InventoryService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadInventoryItems();
  }

  loadInventoryItems(): void {
    this.inventoryService.getInventoryItems().subscribe(items => {
      this.inventoryItems = items;
    });
  }

  openCreateInventoryDialog(): void {
    const dialogRef = this.dialog.open(InventoryDialogComponent, {
      width: '400px',
      data: { item: {} }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadInventoryItems();
      }
    });
  }

  openEditInventoryDialog(item: any): void {
    const dialogRef = this.dialog.open(InventoryDialogComponent, {
      width: '400px',
      data: { item }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadInventoryItems();
      }
    });
  }

  deleteInventoryItem(id: number): void {
    this.inventoryService.deleteInventoryItem(id).subscribe(() => {
      this.loadInventoryItems();
    });
  }

}
