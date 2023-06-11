import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-adminregister',
  templateUrl: './adminregister.component.html',
  styleUrls: ['./adminregister.component.scss'],
})
export class AdminregisterComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit() {}
}
