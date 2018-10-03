import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxMaskModule } from 'ngx-mask';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home/home.component';
import { PaymentPageComponent } from './payment/payment.component';
import { NotfoundPageComponent } from './notfound/notfound.component';
import { ProviderCardComponent } from './home/provider-view/provider-view.component';
import { PaymentFormComponent } from './payment/payment-form/payment-form.component';
import { RequestCache } from './api/request-cache.service';
import { CachingInterceptor } from './api/cache-interceptor.service';
import { ErrorHandlerComponent } from './api/error-handler/error-handler.component';
import { LoadingHandlerComponent } from './api/loading-handler/loading-handler.component';
import { ProvidersEditorFormComponent } from './home/editor-form/editor-form.component';

const PAGES = [
  HomePageComponent,
  PaymentPageComponent,
  NotfoundPageComponent,
];

@NgModule({
  declarations: [
    AppComponent,
    ...PAGES,
    ProviderCardComponent,

    PaymentFormComponent,
    ProvidersEditorFormComponent,

    ErrorHandlerComponent,
    LoadingHandlerComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: HomePageComponent, pathMatch: 'full'},
      { path: 'payment/:slug', component: PaymentPageComponent },
      { path: '404', component: NotfoundPageComponent },
      { path: '**', redirectTo: '/404' },
    ]),
    HttpClientModule,
    ReactiveFormsModule,

    NgxMaskModule.forRoot()
  ],
  providers: [
    Title,

    RequestCache,
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
