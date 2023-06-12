import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  constructor(
    public authService: AuthService, private messageService: MessageService, public router: Router,
  ) {
    window.scrollTo(0, 0);

  }

  errorString: void | string = '';

  ngOnInit() { }

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
    ).then((res: any) => {
      res === 'Đăng nhập thành công' ? this.handMes('success', res) : this.handMes('error', res)
    })
  }
  handMes(status: string, res: string) {
    this.messageService.add({
      summary: "Thông báo",
      severity: status,
      detail: res,
    });
  }
  addValueWithEnterButton() {
    const emailValue = document.querySelector('#userEmail') as HTMLInputElement;
    const passwordValue = document.querySelector(
      '#userPwd'
    ) as HTMLInputElement;
    window.addEventListener('keypress', async (e) => {
      if (e.key === 'Enter') {
        await this.authService.SignIn(emailValue.value, passwordValue.value).then((res: any) => {
          res === 'Đăng nhập thành công' ? this.handMes('success', res) : this.handMes('error', res)
        })
      }
    });
  }
}
