import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { MockService } from './../../mocks.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {

  paymentForm: FormGroup;

  constructor(
    private _MockService: MockService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initNewForm();
    this.paymentForm.controls['price'].valueChanges.subscribe(
      (changedValue) => {
        if (changedValue === 0 || changedValue < 0) { this.paymentForm.controls['price'].setValue(1); }
        if (changedValue > 10000) { this.paymentForm.controls['price'].setValue(10000); }
      }
    );
  }

  initOldForm() {
    this.paymentForm = this.fb.group({
      phone: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]],
      price: [1, [
        Validators.required,
        Validators.min(1),
        Validators.max(1000),
        Validators.pattern(/^\d+$/)
      ]]
    });
  }

  initNewForm() {
    this.paymentForm = new FormGroup({
      phone: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      price: new FormControl(1, [
        Validators.required,
        Validators.min(1),
        Validators.max(1000),
        Validators.pattern(/^\d+$/)
      ])
    });
  }

  tryPhoneNumberAgain() {
    console.log('output!', this.paymentForm.controls['phone'].value);

  }

  onSubmit() {
    if (this.paymentForm.valid) {
      this._MockService.postPayMoneyToProvider(this.paymentForm.value)
        .subscribe(
          data => console.log('Data!', data),
          error => console.log('Bad error:', error)
        );
    }
  }

}
