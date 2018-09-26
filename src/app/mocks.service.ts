import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface ProvidersList {
  id: number;
  title: string;
  slug: string;
}

@Injectable()
export class MockService {

  mockData = '/assets/mocks/operators-list.json';

  constructor(private http: HttpClient) { }

  getProvidersList () {
    return this.http.get<ProvidersList[]>(this.mockData);
  }

}
