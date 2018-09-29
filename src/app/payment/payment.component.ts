import { Component, OnInit } from '@angular/core';
import { MockService } from '../api/mocks.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProvidersList } from '../interfaces';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
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

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router,
    private _MockService: MockService
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
          this.requestState = {
            isLoading: false,
            isError: false
          };
          if (!this.currentProvider) { this._Router.navigate(['404']); }
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
    this.redirectLoading = true;
    console.log('Успех! Платёж принят, спасибо!\n', data);

    // задержка для сглаженного восприятия событий пользователем
    setTimeout(() => {
      this._Router.navigate(['']);
      this.redirectLoading = false;
    }, 3000);
  }

}
