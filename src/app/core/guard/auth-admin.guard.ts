import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthAdminService } from '../services/authAdmin/auth-admin.service';

@Injectable()
export class AuthAdminGuard implements CanActivate {
  constructor(private authService: AuthAdminService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/admin/login']);
      return false;
    } else {
      return true;
    }
  }
}
