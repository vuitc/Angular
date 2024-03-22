import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'cuoiky1';
  constructor(private authService: AuthService) {}
  isAuthenticated() {
    return this.authService.isAuthenticated;
  }
  logout() {
    this.authService.logout();
  }
  isAdmin(): boolean {
    let role = localStorage.getItem('userRole');
    return role === '1';
  }
  
}
