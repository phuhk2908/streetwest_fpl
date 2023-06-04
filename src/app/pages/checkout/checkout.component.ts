import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  formCheckout!: FormGroup;
  constructor(private router: Router, private _fb: FormBuilder) { }
  ngOnInit() {
    this.formCheckout = this._fb.group({
      fullName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      address: ['', Validators.required],
      city: ['', Validators.required],
    })
  }
  get f() { return this.formCheckout.controls }
  isSubmit: boolean = true;


}
