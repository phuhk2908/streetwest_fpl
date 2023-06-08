import {Component, OnInit} from '@angular/core';
import {AuthAdminService} from "../../../core/services/authAdmin/auth-admin.service";

@Component({
  selector: 'app-adminregister',
  templateUrl: './adminregister.component.html',
  styleUrls: ['./adminregister.component.scss'],
})
export class AdminregisterComponent implements OnInit {

  constructor(public authAdminService: AuthAdminService) {
  }

  ngOnInit() {}
}
