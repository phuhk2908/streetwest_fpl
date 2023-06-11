import { Component } from '@angular/core';
import {AuthService} from "../../core/services/auth/auth.service";

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss'],
})
export class HeaderAdminComponent {
  constructor(public authService: AuthService) {}
}
