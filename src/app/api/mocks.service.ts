import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { ProvidersList, PaymentData } from '../interfaces';

@Injectable()
export class MockService {
  mockServer = environment.apiCall;
  providersListCache: ProvidersList[];

  constructor(private http: HttpClient) {}

  getProvidersList() {
    return this.http.get<ProvidersList[]>(`${this.mockServer}/providers`);
  }

  postPayMoneyToProvider(operatorSlug, data) {
    const requestURL = Math.random() >= 0.5
      ? `${this.mockServer}/payments`
      : `${this.mockServer}/payments/error`;

    const sendOrderData = {
      date_created: new Date(),
      provider_slug: operatorSlug,
      payment_data: data,
    };

    return this.http.post<PaymentData>(requestURL, sendOrderData);
  }

  deleteThatPaymentInDB() {
    return this.http.delete(`${this.mockServer}/payments/1`).subscribe(data => {
      console.log('Платёж удалён:\n', data);
    }, error => {
      console.log('Не могу удалить этот платёж из списка:\n', error);
    });
  }

}
