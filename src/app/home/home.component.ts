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

  showEditor = false;

  requestState = {
    isLoading: false,
    isError: false
  };

  constructor( private _MockService: MockService ) {}

  ngOnInit() {
    this.getProvidersList();
  }

  getProvidersList() {
    this.requestState = {
      isLoading: true,
      isError: false
    };

    this._MockService.getProvidersList().subscribe(
      (data: ProvidersList[]) => {
        this.providersList = data;
        this.requestState = {
          isLoading: false,
          isError: false
        };
      },
      error => {
        this.requestState = {
          isLoading: false,
          isError: true
        };
      }
    );
  }

  toggleShowEditor() {
    this.showEditor = !this.showEditor;
  }

  pushNewProviderToList(provider: ProvidersList) {
    this.providersList.push(provider);
  }

}
