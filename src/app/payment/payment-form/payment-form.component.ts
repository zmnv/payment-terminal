import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MockService } from '../../api/mocks.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
  providers: [ MockService ]
})
export class PaymentFormComponent implements OnInit, AfterViewInit {
  @Input() operatorSlug: string;
  @Output() handleSendFormComplete: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('autofocus') private elementRef: ElementRef;
  @ViewChild('thenfocus') private elementRefThen: ElementRef;
  paymentForm: FormGroup;

  requestState = {
    isLoading: false,
    isSuccess: false,
    isError: false
  };

  showValidationsError = false;

  constructor(
    private _MockService: MockService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.initForm();
    this.paymentForm.controls['phone'].statusChanges.subscribe(
      status => {
        if (status === 'VALID') { this.elementRefThen.nativeElement.focus();}
      }
    );
    this.paymentForm.controls['price'].valueChanges.subscribe(
      changedValue => {
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
      price: [null, [
        Validators.required,
        Validators.min(1),
        Validators.max(1000),
        Validators.pattern(/^\d+$/)
      ]]
    });
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      this.showValidationsError = false;
      this.setRequestState(true, false, false);

      // задержка для наглядности ожидания ответа от сервера
      setTimeout(() => {
        this.httpSendPayment();
      }, 1000);

    } else {
      this.showValidationsError = true;
    }
  }

  setRequestState(isLoading, isSuccess, isError) {
    this.requestState = {
      isLoading,
      isSuccess,
      isError,
    };
  }

  httpSendPayment() {
    this._MockService.postPayMoneyToProvider(this.operatorSlug, this.paymentForm.value)
    .subscribe(
      data => {
        this.setRequestState(false, true, false);
        this.handleSendFormComplete.emit(data);
        this._MockService.deleteThatPaymentInDB();
      },
      error => this.setRequestState(false, false, true)
    );
  }
}
