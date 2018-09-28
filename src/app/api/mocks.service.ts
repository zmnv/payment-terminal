import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

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

  postPayMoneyToProvider(data) {
    console.log('this.paymentForm data', data);
    return this.http.post<PaymentData>(`${this.mockServer}/payments`, data);
  }

}
