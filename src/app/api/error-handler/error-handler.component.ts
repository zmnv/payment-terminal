import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error-handler.component.html'
})
export class ErrorHandlerComponent {
  @Output() handleRefreshRequest: EventEmitter<any> = new EventEmitter<any>();
  errorText = `Ошибка соединения...`;

  refreshHandler() {
    return this.handleRefreshRequest.emit();
  }

}
