import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../../environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { OrderComponent } from './components/order/order.component';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { orderReducer } from './state/order.reducer';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(
      {orderReducer},
      {
        metaReducers: [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true
        }
      }
    ),
    AgGridModule,
    AuthModule.forRoot({
      ...env.auth,
      httpInterceptor: {
        ...env.httpInterceptor,
      },
    }),
    NgbModule,
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
    {
      provide: Window,
      useValue: window,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
