import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RejectreasonPageModule } from './rejectreason/rejectreason.module';
import { ChangedatePageModule } from './changedate/changedate.module';
import { CarddetailsPageModule } from './carddetails/carddetails.module';
import { ConfirmPaymentPageModule } from './confirm-payment/confirm-payment.module';
import { PaymentcompletePageModule } from './paymentcomplete/paymentcomplete.module';
import { PaynowPageModule } from './paynow/paynow.module';
import { ReceivepaymentPageModule } from './receivepayment/receivepayment.module';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    RejectreasonPageModule,
    ConfirmPaymentPageModule,
    PaynowPageModule,
    CarddetailsPageModule,
    PaymentcompletePageModule,
    ReceivepaymentPageModule,
    ChangedatePageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
