import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { MockService } from '../../api/mocks.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit, AfterViewInit {
  @ViewChild('autofocus') private elementRef: ElementRef;
  paymentForm: FormGroup;

  requestState = {
    isLoading: false,
    isError: false
  };

  constructor(
    private _MockService: MockService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
    this.paymentForm.controls['price'].valueChanges.subscribe(
      (changedValue) => {
        if (changedValue === 0 || changedValue < 0) { this.paymentForm.controls['price'].setValue(1); }
        if (changedValue > 1000) { this.paymentForm.controls['price'].setValue(1000); }
      }
    );
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.focus();
  }

  initForm() {
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

  onSubmit() {
    if (this.paymentForm.valid) {
      this.requestState = {
        isLoading: true,
        isError: false
      };

      this._MockService.postPayMoneyToProvider(this.paymentForm.value)
        .subscribe(
          data => {
            setTimeout(() => {
              this.requestState = {
                isLoading: false,
                isError: false
              };
            }, 300);
          },
          error => {
            this.requestState = {
              isLoading: false,
              isError: true
            };
          }
        );
    }
  }

}
