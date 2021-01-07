import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AllErrandRequestsPage } from './all-errand-requests.page';

const routes: Routes = [
  {
    path: '',
    component: AllErrandRequestsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AllErrandRequestsPage]
})
export class AllErrandRequestsPageModule {}
