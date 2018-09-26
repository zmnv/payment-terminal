import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {

  paymentForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
    this.paymentForm.controls['price'].valueChanges.subscribe(
      (changedValue) => {
        if (changedValue === 0 || changedValue < 0) { this.paymentForm.controls['price'].setValue(1); }
        if (changedValue > 10000) { this.paymentForm.controls['price'].setValue(10000); }
      }
    );
  }

  initForm() {
    this.paymentForm = this.fb.group({
      phone: ['', [
        Validators.required
      ]],
      price: [1, [
        Validators.required,
        Validators.min(1),
        Validators.max(1000),
        Validators.pattern(/^\d+$/)
      ]]
    });
  }


}
