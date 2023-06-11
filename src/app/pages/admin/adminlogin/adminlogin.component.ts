import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/services/auth/auth.service";
@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.scss'],
})
export class AdminloginComponent implements OnInit {
  constructor(public authService: AuthService) {
  }
  ngOnInit() {}
}
