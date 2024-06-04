import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { createRoleForm } from 'src/app/forms/roles/role-form';
import { RoleService } from 'src/app/services/roles/role.service';
import { Data, IRole } from '../../interfaces/IRoles';

@Component({
  selector: 'app-role-dialog',
  templateUrl: './role-dialog.component.html',
  styleUrls: ['./role-dialog.component.css']
})
export class RoleDialogComponent implements OnInit {

  roleForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<RoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private fb: FormBuilder,
    private roleService: RoleService
  ) { 
    this.roleForm = createRoleForm(fb, data);
  }

  ngOnInit(): void {
  }

  onSave(): void {
    if (this.data.role.id) {
      this.roleService.updateRole(this.data.role.id, this.roleForm.value).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      this.roleService.createRole(this.roleForm.value).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
