import { MockService } from './../../api/mocks.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProvidersList } from '../../interfaces';

@Component({
  selector: 'app-provider-card',
  templateUrl: './provider-view.component.html',
  styleUrls: ['./provider-view.component.scss'],
  providers: [ MockService ]
})

export class ProviderCardComponent {
  @Input() provider: ProvidersList;
  @Output() handleDeleteProvider: EventEmitter<any> = new EventEmitter<any>();

  showControls = false;

  requestState = {
    isLoading: false,
    isError: false
  };

  constructor(private _MockService: MockService) {}

  setShowControls(state = true) {
    this.showControls = state;
  }

  setRequestStateClear(isLoading, isError) {
    this.requestState = {
      isLoading,
      isError,
    };
  }

  deleteThisProvider() {
    this.setRequestStateClear(true, false);
    this.showControls = false;

    this._MockService.deleteProvider(this.provider.id).subscribe(data => {
      console.log('Провайдер удалён:\n', data);
      this.setRequestStateClear(false, false);
      this.handleDeleteProvider.emit(this.provider.id);
    }, error => {
      console.log('Не могу удалить провайдера из списка:\n', error);
      this.setRequestStateClear(false, true);
      this.showControls = false;
    });
  }

  cancelControls() {
    this.showControls = false;
    this.setRequestStateClear(false, false);
  }

  denyToDeleteProviders() {
    switch (this.provider.id) {
      case 1:
      case 2:
      case 3: {
        return false;
      }
      default: {
        return true;
      }
    }

  }
}
