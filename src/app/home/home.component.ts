import { Component, OnInit } from '@angular/core';
import { MockService } from '../api/mocks.service';
import { ProvidersList } from '../interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ MockService ]
})

export class HomePageComponent implements OnInit {

  providersList: ProvidersList[];

  constructor( private _MockService: MockService ) {
    console.log('>construct');
  }

  ngOnInit() {
    console.log('init');
    this.getProvidersList();
  }


  getProvidersList() {
    this._MockService.getProvidersList().subscribe(
      (data: ProvidersList[]) => {
        this.providersList = data;
        console.log('tak', data);
      },
      error => console.log('ERROR:', error)
    );
  }

}
