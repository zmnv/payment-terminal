import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

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
  mockServer = environment.apiCall;
  providersListCache: ProvidersList[];

  private providersListUpdater = new Subject<ProvidersList[]>();
  providersListUpdaterSubscriber$ = this.providersListUpdater.asObservable();

  constructor(private http: HttpClient) {}

  getProvidersList() {
    return this.http.get<ProvidersList[]>(`${this.mockServer}/providers`);
  }

  updateProvidersList() {
    return this.getProvidersList().subscribe(result => {
      this.providersListUpdater.next(result);
    });
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
