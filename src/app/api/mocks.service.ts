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

  addProvider(provider: ProvidersList) {
    return this.http.post<ProvidersList>(`${this.mockServer}/providers`, provider);
  }

  deleteProvider(provider_id: number) {
    return this.http.delete(`${this.mockServer}/providers/${provider_id}`);
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

  deleteThatPaymentInDB(param = '/1') {
    return this.http.delete(`${this.mockServer}/payments${param}`).subscribe(data => {
      console.log('Платёж удалён:\n', data);
    }, error => {
      console.log('Не могу удалить этот платёж из списка:\n', error);
    });
  }

}
