import { Component, OnInit } from '@angular/core';
import { AuthAdminService } from '../../core/services/authAdmin/auth-admin.service';

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.scss'],
})
export class SidebarAdminComponent implements OnInit {
  constructor(public authService: AuthAdminService) {}

  ngOnInit() {}
}
