import {Router, CanActivate} from '@angular/router';
import { AuthService } from "../services/auth/auth.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isLoggedIn){
      this.router.navigate(['/dashboard'])
      return false;
    } else {
      return true;
    }
  }
}
