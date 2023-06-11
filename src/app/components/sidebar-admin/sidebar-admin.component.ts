import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../core/services/auth/auth.service";

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.scss'],
})
export class SidebarAdminComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit() {}
}
