import {Component, OnInit} from '@angular/core';
import {AuthAdminService} from "../../../core/services/authAdmin/auth-admin.service";

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.scss'],
})
export class AdminloginComponent implements OnInit {
  constructor(public authAdminService: AuthAdminService) {
  }
  ngOnInit() {}
}
