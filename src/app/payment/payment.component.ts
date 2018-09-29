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
          console.log('currentProvider', this.currentProvider);
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

  deleteProvider() {
    this._MockService.deleteProvider(this.currentProvider.id).subscribe(data => {
      console.log('Провайдер удалён:\n', data);
      this.reloadPage();
    }, error => {
      console.log('Не могу удалить провайдера из списка:\n', error);
    });
  }

  isPaymentSuccess(data) {
    console.log('Успех! Платёж принят, спасибо!\n', data);
    this.navigateToMainScreen();
  }

  navigateToMainScreen(delay = 3000) {
    this.redirectLoading = true;
    // задержка для сглаженного восприятия событий пользователем
    setTimeout(() => {
      this._Router.navigate(['']);
      this.redirectLoading = false;
    }, delay);
  }

  reloadPage() {
    this.redirectLoading = true;
    this.redirectLoading = false;
    location.href = '/';
  }

}
