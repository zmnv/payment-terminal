import { Component, OnInit } from '@angular/core';
import { MockService, ProvidersList } from '../mocks.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  providers: [ MockService ]
})
export class PaymentPageComponent implements OnInit {

  currentProvider: ProvidersList;

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router,
    private _MockService: MockService
  ) { }

  ngOnInit() {
    this._ActivatedRoute.params.subscribe(params => {
      const slug = params['slug'];
      this.getProviderBySlug(slug);
    });

  }

  getProviderBySlug(slug: string) {
    this._MockService.getProvidersList()
      .subscribe(
        data => {
          this.currentProvider = data.find(element => element['slug'] === slug);
          if (!this.currentProvider) { this._Router.navigate(['404']); }
        },
        error => console.log('ERROR', error)
      );
  }

}
