import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/services/auth/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, AfterViewInit {
  constructor(public authService: AuthService) {}
  ngOnInit() {}

  ngAfterViewInit() {
    this.addValueWithEnterButton();
  }

  addValueWithEnterButton() {
    const emailValue = document.querySelector('#userEmail') as HTMLInputElement
    const passwordValue = document.querySelector('#userPwd') as HTMLInputElement
    const usernameValue = document.querySelector('#username') as HTMLInputElement
    window.addEventListener('keypress', (e) => {
      if(e.key === 'Enter') {
        this.authService.SignUp(emailValue.value,passwordValue.value, usernameValue.value);
      }
    })
  }

}
