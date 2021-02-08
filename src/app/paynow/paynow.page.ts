import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { PaymentcompletePage } from '../paymentcomplete/paymentcomplete.page';
import { ErrandRunner } from '../shared/models/ErrandRunner';
import { Job } from '../shared/models/Job';
import { Payment } from '../shared/models/Payment';
import { User } from '../shared/models/User';
import { JobService } from '../shared/services/job.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-paynow',
  templateUrl: './paynow.page.html',
  styleUrls: ['./paynow.page.scss'],
})
export class PaynowPage implements OnInit {
  bill: Payment;
  job: Job;
  applicant: ErrandRunner;
  user: User;

  constructor(private modalController: ModalController, public navParams: NavParams, public jobService: JobService, private userService: UserService) {
    this.bill = navParams.get("fullamt")
    this.job = navParams.get('sJob')
    this.applicant = navParams.get('sApp')
    this.userService.getUserInfoNoImage(this.applicant.id)
    .subscribe(data=>{
      this.user = data
    })
  }

  ngOnInit() {
  }

  async confirm() {
    this.jobService.createnewbill(this.bill)
    this.jobService.changeJobsAcceptedtoJobsCompleted(this.job, this.applicant)
    this.jobService.deletefromJobsAccepted(this.job)
    this.modalController.dismiss();

    const modal = await this.modalController.create({
      component: PaymentcompletePage
    });
    return await modal.present();
  }
}
