import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  constructor(public authService: AuthService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.addValueWithEnterButton();
  }

  addValueWithEnterButton() {
    const emailValue = document.querySelector('#userEmail') as HTMLInputElement
    const passwordValue = document.querySelector('#userPwd') as HTMLInputElement
    window.addEventListener('keypress', (e) => {
      if(e.key === 'Enter') {
        this.authService.SignIn(emailValue.value,passwordValue.value);
      }
    })
  }
}
