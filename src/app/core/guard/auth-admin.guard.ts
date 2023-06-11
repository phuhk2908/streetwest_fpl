import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from "../services/auth/auth.service";

@Injectable()
export class AuthAdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  async canActivate(): Promise<boolean> {
    let is = await this.authService.isAdmin();
    if (!is) {
      this.router.navigate(['/shop']);
      return false
    }
    return is
  }
}
