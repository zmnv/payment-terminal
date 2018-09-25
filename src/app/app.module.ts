import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home/home.component';
import { PaymentPageComponent } from './payment/payment.component';
import { NotfoundPageComponent } from './notfound/notfound.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PaymentPageComponent,
    NotfoundPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: HomePageComponent, pathMatch: 'full'},
      { path: 'payment', component: PaymentPageComponent },
      { path: '404', component: NotfoundPageComponent },
      { path: '**', redirectTo: '/404' },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
