import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MockService } from '../../api/mocks.service';
import { ProvidersList } from '../../interfaces';

@Component({
  selector: 'app-providers-editor-form',
  templateUrl: './editor-form.component.html',
  providers: [ MockService ]
})
export class ProvidersEditorFormComponent implements OnInit, AfterViewInit {
  @Output() handleSendFormComplete: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('autofocus') private elementRef: ElementRef;

  providersEditorForm: FormGroup;

  requestState = {
    isLoading: false,
    isSuccess: false,
    isError: false
  };

  showValidationsError = false;

  constructor(
    private fb: FormBuilder,
    private _MockService: MockService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.focus();
  }

  initForm() {
    this.providersEditorForm = this.fb.group({
      provider_slug: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(64),
        Validators.pattern(/^[^\-\$][A-z0-9\-]+$/)
      ]],
      provider_title: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(128),
        Validators.pattern(/^[^\-\$][A-zА-я0-9\-]+$/)
        ]
      ]
    });
  }

  onSubmit() {
    if (this.providersEditorForm.valid) {
      this.showValidationsError = false;
      this.setRequestState(true, false, false);
      this.addProvider();
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

  addProvider() {
    const getRandomId = (min, max) => {
      return Math.floor(Math.random() * (max - min) + min);
    };

    const provider: ProvidersList = {
      id: getRandomId(1000000, 9999999),
      title: this.providersEditorForm.controls['provider_title'].value,
      slug: this.providersEditorForm.controls['provider_slug'].value.toLowerCase(),
    };

    this._MockService.addProvider(provider).subscribe(
      res => {
        this.setRequestState(false, true, false);
        this.handleSendFormComplete.emit(res);
      },
      err => {
        this.setRequestState(false, false, true);
        console.log('addProvider() ERROR:', err);
      }
    );
  }

}
