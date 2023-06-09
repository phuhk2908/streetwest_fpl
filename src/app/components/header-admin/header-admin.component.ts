import { Component } from '@angular/core';
import { AuthAdminService } from 'src/app/core/services/authAdmin/auth-admin.service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss'],
})
export class HeaderAdminComponent {
  constructor(public authAdminService: AuthAdminService) {}
}
