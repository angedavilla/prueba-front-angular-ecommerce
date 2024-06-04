import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  showMenu: boolean = false;

  constructor(public authService: AuthService, private router: Router) { }
  

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
