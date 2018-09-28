import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error-handler.component.html',
  styleUrls: ['./error-handler.component.scss']
})
export class ErrorHandlerComponent implements OnInit {
  @Output() handleRefreshRequest: EventEmitter<any> = new EventEmitter<any>();
  errorText = `Ошибка соединения...`;

  constructor() { }

  ngOnInit() {
  }

  refreshHandler() {
    return this.handleRefreshRequest.emit();
  }

}
