import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { PaymentcompletePage } from '../paymentcomplete/paymentcomplete.page';
import { Job } from '../shared/models/Job';
import { Payment } from '../shared/models/Payment';
import { JobService } from '../shared/services/job.service';

@Component({
  selector: 'app-paynow',
  templateUrl: './paynow.page.html',
  styleUrls: ['./paynow.page.scss'],
})
export class PaynowPage implements OnInit {
  bill: Payment;
  job: Job;

  constructor(private modalController: ModalController, public navParams: NavParams, public jobService: JobService) {
    this.bill = navParams.get("fullamt")
    this.job = navParams.get('sJob')
  }

  ngOnInit() {
  }

  async confirm() {
    this.jobService.createnewbill(this.bill)
    this.jobService.changeJobsAcceptedtoJobsCompleted(this.job, this.job.applicant[0])
    this.modalController.dismiss();

    const modal = await this.modalController.create({
      component: PaymentcompletePage
    });
    return await modal.present();
  }
}
