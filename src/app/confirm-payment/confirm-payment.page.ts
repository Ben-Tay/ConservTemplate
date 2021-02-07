import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { CarddetailsPage } from '../carddetails/carddetails.page';
import { PaynowPage } from '../paynow/paynow.page';
import { Job } from '../shared/models/Job';
import { Payment } from '../shared/models/Payment';

@Component({
  selector: 'app-confirm-payment',
  templateUrl: './confirm-payment.page.html',
  styleUrls: ['./confirm-payment.page.scss'],
})
export class ConfirmPaymentPage implements OnInit {
  job: Job;
  bill: Payment;
  newbill: Payment;

  constructor(private modalController: ModalController, private router: Router, public navParams: NavParams) {
    this.bill = navParams.get("fullamt")
    this.job = navParams.get('sJob')
  }

  ngOnInit() {
  }

  async paynow() {
    this.modalController.dismiss();

    const modal = await this.modalController.create({
      component: PaynowPage,
      componentProps: {
        fullamt: this.newbill = new Payment(this.bill.errandid, this.bill.billamt, this.bill.commission, this.bill.fullamt, 'PayNow', this.bill.payment_status),
        sJob: this.job
      },
      cssClass: 'modal-wrapper'
    });
    return await modal.present();
  }

  async carddetails() {
    this.modalController.dismiss();

    const modal = await this.modalController.create({
      component: CarddetailsPage,
      componentProps: {
        fullamt: this.newbill = new Payment(this.bill.errandid, this.bill.billamt, this.bill.commission, this.bill.fullamt, 'Card', this.bill.payment_status),
        sJob: this.job
      },
      cssClass: 'modal-wrapper'
    });
    return await modal.present();
  }
}
