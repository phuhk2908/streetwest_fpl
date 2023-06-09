import {Component, OnInit} from '@angular/core';
import {AuthAdminService} from "../../../../core/services/authAdmin/auth-admin.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  constructor(public authAdminService: AuthAdminService) {}
  ngOnInit(): void {}
}
