import { Component, OnInit, OnDestroy } from '@angular/core';
import { MockService, ProvidersList } from '../mocks.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  providers: [ MockService ]
})
export class PaymentPageComponent implements OnInit, OnDestroy {

  currentProvider: ProvidersList;

  private routerParams: any;

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router,
    private _MockService: MockService
  ) { }

  ngOnInit() {
    this.routerParams = this._ActivatedRoute.params.subscribe(params => {
      const slug = params['slug'];
      this.getProviderBySlug(slug);
    });

  }

  ngOnDestroy() {
    this.routerParams.unsubscribe();
  }

  getProviderBySlug(slug: string) {
    this._MockService.getProvidersList()
      .subscribe(result => {
          this.currentProvider = result.find(element => element['slug'] === slug);
          if (!this.currentProvider) this._Router.navigate(['404']);
        },
        error => console.log('ERROR', error)
      );
  }


}
