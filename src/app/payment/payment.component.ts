import { Component, OnInit } from '@angular/core';
import { MockService } from '../api/mocks.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProvidersList } from '../interfaces';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  providers: [ MockService ]
})
export class PaymentPageComponent implements OnInit {

  currentProvider: ProvidersList;
  currentSlug: string;

  redirectLoading = false;

  requestState = {
    isLoading: false,
    isError: false
  };

  cantDelete = false;

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router,
    private _MockService: MockService,
    private _Title: Title
  ) { }

  ngOnInit() {
    this._ActivatedRoute.params.subscribe(params => {
      this.currentSlug = params['slug'];
      this.getProviderBySlug(this.currentSlug);
    });

  }

  getProviderBySlug(slug: string) {
    this.requestState = {
      isLoading: true,
      isError: false
    };
    this._MockService.getProvidersList()
      .subscribe(
        data => {
          this.currentProvider = data.find(element => element['slug'] === slug);
          if (!this.currentProvider) { this._Router.navigate(['']); }

          this._Title.setTitle(`${this.currentProvider.title} — пополнить баланс`);
          this.requestState = {
            isLoading: false,
            isError: false
          };
        },
        error => {
          this.requestState = {
            isLoading: false,
            isError: true
          };
        }
      );
  }

  isPaymentSuccess(data) {
    console.log('Успех! Платёж принят, спасибо!\n', data);
    this.navigateToMainScreen();
  }

  navigateToMainScreen(delay = 1000) {
    this.redirectLoading = true;
    // задержка для сглаженного восприятия событий пользователем
    setTimeout(() => {
      this._Router.navigate(['']);
      this.redirectLoading = false;
    }, delay);
  }

}
