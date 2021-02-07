import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { PaymentcompletePage } from '../paymentcomplete/paymentcomplete.page';
import { Payment } from '../shared/models/Payment';
import { JobService } from '../shared/services/job.service';

@Component({
  selector: 'app-carddetails',
  templateUrl: './carddetails.page.html',
  styleUrls: ['./carddetails.page.scss'],
})
export class CarddetailsPage implements OnInit {
  CardDetailsForm: FormGroup;
  cardNo: number;
  expiryDate: Date;
  securityCode: number;
  bill: Payment;

  constructor(private modalController: ModalController, public navParams: NavParams, public jobService: JobService) {
    this.bill = navParams.get("fullamt")
  }

  ngOnInit() {
  }

  async confirm() {
    this.jobService.createnewbill(this.bill)
    this.modalController.dismiss();

    const modal = await this.modalController.create({
      component: PaymentcompletePage
    });
    return await modal.present();
  }
}
