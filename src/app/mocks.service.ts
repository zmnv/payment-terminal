import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';

export interface ProvidersList {
  id: number;
  title: string;
  slug: string;
}

export interface PaymentData {
  data_send: string;
  provider: string;
}

@Injectable()
export class MockService {

  mockData = '/assets/mocks/operators-list.json';
  mockServer = environment.apiCall;

  constructor(private http: HttpClient) { }

  getProvidersList () {
    return this.http.get<ProvidersList[]>(`${this.mockServer}/providers`);
  }

  postPayMoneyToProvider(data) {
    const body: PaymentData = {
      data_send: 'hello',
      provider: 'sadasda'
    };

    console.log('this.paymentForm data', data);

    return this.http.post<PaymentData>(`${this.mockServer}/payments`, data);
  }

}
