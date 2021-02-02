import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PaymentErrandrunnerPage } from './payment-errandrunner.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentErrandrunnerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PaymentErrandrunnerPage]
})
export class PaymentErrandrunnerPageModule {}
