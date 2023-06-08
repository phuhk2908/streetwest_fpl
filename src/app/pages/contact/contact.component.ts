import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  frm1!: FormGroup;
  ngOnInit() {
    this.frm1 = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      number: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
      rule: new FormControl('', Validators.required),
    });
  }
  getForm() {
    if (!this.frm1.valid) {
    } else {
      console.log(this.frm1.value);
    }
  }
}
