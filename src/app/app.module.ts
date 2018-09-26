import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxMaskModule } from 'ngx-mask';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home/home.component';
import { PaymentPageComponent } from './payment/payment.component';
import { NotfoundPageComponent } from './notfound/notfound.component';
import { ProviderCardComponent } from './provider-view/provider-view.component';
import { PaymentFormComponent } from './payment/payment-form/payment-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PaymentPageComponent,
    NotfoundPageComponent,
    ProviderCardComponent,
    PaymentFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomePageComponent, pathMatch: 'full'},
      { path: 'payment/:slug', component: PaymentPageComponent },
      { path: '404', component: NotfoundPageComponent },
      { path: '**', redirectTo: '/404' },
    ]),
    NgxMaskModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
