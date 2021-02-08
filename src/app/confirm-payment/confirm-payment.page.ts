import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { CarddetailsPage } from '../carddetails/carddetails.page';
import { PaynowPage } from '../paynow/paynow.page';
import { ErrandRunner } from '../shared/models/ErrandRunner';
import { Job } from '../shared/models/Job';
import { Payment } from '../shared/models/Payment';
import { User } from '../shared/models/User';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-confirm-payment',
  templateUrl: './confirm-payment.page.html',
  styleUrls: ['./confirm-payment.page.scss'],
})
export class ConfirmPaymentPage implements OnInit {
  job: Job;
  bill: Payment;
  newbill: Payment;
  applicant: ErrandRunner;
  user: User;

  constructor(private modalController: ModalController, private userService: UserService, public navParams: NavParams) {
    this.bill = navParams.get("fullamt")
    this.job = navParams.get('sJob')
    this.applicant = navParams.get('sApp')
    this.userService.observeAuthState(user=>{
      this.userService.getUserInfoNoImage(user.email)
      .subscribe(data=>{
        this.user = data
      })
    })
  }

  ngOnInit() {
  }

  async paynow() {
    this.modalController.dismiss();

    const modal = await this.modalController.create({
      component: PaynowPage,
      componentProps: {
        fullamt: this.newbill = new Payment(this.bill.errandId, this.bill.billamt, this.bill.commission, this.bill.fullamt, 'PayNow', this.bill.payment_status),
        sJob: this.job,
        sApp: this.applicant
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
        fullamt: this.newbill = new Payment(this.bill.errandId, this.bill.billamt, this.bill.commission, this.bill.fullamt, 'Card', this.bill.payment_status),
        sJob: this.job,
        sApp: this.applicant
      },
      cssClass: 'modal-wrapper'
    });
    return await modal.present();
  }
}
