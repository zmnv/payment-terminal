import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { MockService } from '../../api/mocks.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit, AfterViewInit {
  @Input() operatorSlug: string;

  @ViewChild('autofocus') private elementRef: ElementRef;
  paymentForm: FormGroup;

  requestState = {
    isLoading: false,
    isSuccess: false,
    isError: false
  };

  showPhoneValidationError = false;

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
      this.showPhoneValidationError = false;
      this.setRequestState(true, false, false);

      this._MockService.postPayMoneyToProvider(this.operatorSlug, this.paymentForm.value)
        .subscribe(
          data => {
            setTimeout(() => {
              this.setRequestState(false, true, false);
              this.getRandomTimeError();

              console.log('Успех! Добавлено в базу данных:', data);
            }, 800);
          },
          error => this.setRequestState(false, false, true)
        );
    } else {
      this.showPhoneValidationError = true;
    }
  }

  setRequestState(isLoading, isSuccess, isError) {
    this.requestState = {
      isLoading,
      isSuccess,
      isError,
    };
  }

  getRandomTimeError() {
    if (Math.random() >= 0.5) { this.setRequestState(false, false, true); }
  }

}
