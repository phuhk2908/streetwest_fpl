import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../core/services/auth/auth.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  constructor(
    public authService: AuthService
  ) {
    window.scrollTo(0, 0);
  }
  ngOnInit() {
  }
}
