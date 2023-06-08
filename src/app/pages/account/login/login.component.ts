import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit, AfterViewInit {
  constructor(
    public authService: AuthService,
    private messageService: MessageService
  ) {}

  errorString: void | string = '';

  ngOnInit() {}

  ngAfterViewInit() {
    this.addValueWithEnterButton();
  }

  async getMessage() {
    const emailValue = document.querySelector('#userEmail') as HTMLInputElement;
    const passwordValue = document.querySelector(
      '#userPwd'
    ) as HTMLInputElement;
    this.errorString = await this.authService.SignIn(
      emailValue.value,
      passwordValue.value
    );
  }

  addValueWithEnterButton() {
    const emailValue = document.querySelector('#userEmail') as HTMLInputElement;
    const passwordValue = document.querySelector(
      '#userPwd'
    ) as HTMLInputElement;
    window.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.authService.SignIn(emailValue.value, passwordValue.value);
      }
    });
  }
}
