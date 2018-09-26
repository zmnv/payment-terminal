import { Component, OnInit } from '@angular/core';
import { MockService, ProvidersList } from '../mocks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ MockService ]
})

export class HomePageComponent implements OnInit {

  providersList: ProvidersList[];

  constructor( private _MockService: MockService ) {}

  ngOnInit() {
    this.getProvidersList();
  }

  getProvidersList() {
    this._MockService.getProvidersList()
      .subscribe(
        (result: ProvidersList[]) => this.providersList = result,
        error => console.log('ERROR:', error)
      );
  }

}
