import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RoleDialogComponent } from '../role-dialog/role-dialog.component';
import { RoleService } from 'src/app/services/roles/role.service';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css']
})
export class RoleManagementComponent implements OnInit {

  roles: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'actions'];

  constructor(private roleService: RoleService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.roleService.getRoles().subscribe(roles => {
      this.roles = roles;
    });
  }

  openCreateRoleDialog(): void {
    const dialogRef = this.dialog.open(RoleDialogComponent, {
      width: '400px',
      data: { role: {} }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadRoles();
      }
    });
  }

  openEditRoleDialog(role: any): void {
    const dialogRef = this.dialog.open(RoleDialogComponent, {
      width: '400px',
      data: { role }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadRoles();
      }
    });
  }

  deleteRole(id: number): void {
    this.roleService.deleteRole(id).subscribe(() => {
      this.loadRoles();
    });
  }

}
