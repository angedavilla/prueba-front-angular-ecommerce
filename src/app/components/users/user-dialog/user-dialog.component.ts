import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/users/user.service';
import { IUser } from '../../interfaces/IUser';
import { createUserForm } from 'src/app/forms/users/user-form';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {

  userForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUser,
    private fb: FormBuilder,
    private userService: UserService
  ) { 
    this.userForm = createUserForm(fb, data);
}

  ngOnInit(): void {
  }

  onSave(): void {
    if (this.data.user.id) {
      this.userService.updateUser(this.data.user.id, this.userForm.value).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      this.userService.createUser(this.userForm.value).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
