import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-provider-card',
  templateUrl: './provider-view.component.html',
  styleUrls: ['./provider-view.component.scss'],
  // providers: [ MockService ]
})

export class ProviderCardComponent {
  @Input() title: string;
  @Input() slug: string;
}
