import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from "../services/auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/shop']);
      return false;
    } else {
      return true;
    }
  }
}
