import { Component, OnInit } from '@angular/core';
import { UserRoleService } from '../../../services/users/user-role.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUser } from '../../interfaces/IUser';
import { UserService } from '../../../services/users/user.service';
import { IUserRole } from '../../interfaces/IUserRole';

@Component({
  selector: 'app-roles-user-management',
  templateUrl: './roles-user-management.component.html',
  styleUrls: ['./roles-user-management.component.css']
})
export class RolesUserManagementComponent implements OnInit {

  users!: IUserRole[];
  username: string = '';
  roles: string[] = [];
  newRole: string = '';
  oldRole: string = '';
  message: string = '';
  selectedUsername: string = '';

  constructor(
    private userRoleService: UserRoleService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userRoleService.getUsers().subscribe(users => {
      this.users = users;
      console.log(users)
    });
  }

  getUserRoles(): void {
    const usernameToGetRoles = this.selectedUsername || this.username;
    if (!usernameToGetRoles) {
      this.showMessage('Please select or enter a username');
      return;
    }
    this.roles = [];
    this.userRoleService.getUserRoles(usernameToGetRoles).subscribe(
      roles => {
        if (roles.length === 0) {
          this.showMessage('This user does not have any roles');
        } else {
          this.roles = roles;
        }
      },
      error => this.showMessage(`Error: ${error.message}`)
    );
  }

  
  addUserRole(): void {
    if (!this.selectedUsername) {
      this.showMessage('Please select a username');
      return;
    }
  
    this.userRoleService.addUserRole(this.selectedUsername, this.newRole).subscribe(
      () => {
        this.getUserRoles();
        this.showMessage('Role added successfully');
      },
      error => this.showMessage(`Error: ${error.message}`)
    );
  }

  removeUserRole(roleName: string): void {
    if (!this.selectedUsername) {
      this.showMessage('Please select a username');
      return;
    }
  
    this.userRoleService.removeUserRole(this.selectedUsername, roleName).subscribe(
      () => {
        this.getUserRoles();
        this.showMessage('Role removed successfully');
      },
      error => this.showMessage(`Error: ${error.message}`)
    );
  }
  


  changeUserRole(): void {
    if (!this.selectedUsername) {
      this.showMessage('Please select a username');
      return;
    }
  
    this.userRoleService.changeUserRole(this.selectedUsername, this.oldRole, this.newRole).subscribe(
      () => {
        this.getUserRoles();
        this.showMessage('Role changed successfully');
      },
      error => this.showMessage(`Error: ${error.message}`)
    );
  }
  

  private showMessage(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000 });
  }

}
