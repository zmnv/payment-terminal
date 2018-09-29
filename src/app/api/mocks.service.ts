import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    const sendOrderData = {
      provider_slug: operatorSlug,
      payment_data: data
    };
    const httpHeaders = {
      headers: {
        'Cache-control':  'no-store',
      }
    };
    return this.http.post<PaymentData>(`${this.mockServer}/payments`, sendOrderData, httpHeaders);
  }

}
