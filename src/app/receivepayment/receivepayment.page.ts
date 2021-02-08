import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { CarddetailsPage } from '../carddetails/carddetails.page';
import { PaynowPage } from '../paynow/paynow.page';
import { ErrandRunner } from '../shared/models/ErrandRunner';
import { Job } from '../shared/models/Job';
import { Payment } from '../shared/models/Payment';
import { User } from '../shared/models/User';
import { JobERService } from '../shared/services/job-er.service';
import { JobService } from '../shared/services/job.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-receivepayment',
  templateUrl: './receivepayment.page.html',
  styleUrls: ['./receivepayment.page.scss'],
})
export class ReceivepaymentPage implements OnInit {
  job: Job;
  bill: Payment;
  paidbill: Payment[];
  newbill: Payment;
  applicant: ErrandRunner;
  user: User;
  client: User;

  constructor(private modalController: ModalController, private userService: UserService, public navParams: NavParams, private jobERService: JobERService, private jobService: JobService, private router: Router) {
    this.bill = navParams.get("fullamt")
    this.job = navParams.get('sJob')
    this.applicant = navParams.get('sApp')
    this.userService.observeAuthState(user=>{
      this.userService.getUserInfoNoImage(user.email)
      .subscribe(data=>{
        this.user = data
      })
    })
    this.userService.getUserInfoNoImage(this.job.client)
    .subscribe(data=>{
      this.client = data
    })
    this.jobERService.getBillsById(this.job.id)
    .then(data=>{
      this.paidbill = data
      this.newbill = new Payment(this.bill.errandId, this.bill.billamt, this.bill.commission, this.bill.fullamt, this.paidbill[0].paymenttype, this.bill.payment_status)
    })
  }

  ngOnInit() {
  }

  async paynow() {
    this.modalController.dismiss();

    const modal = await this.modalController.create({
      component: PaynowPage
    });
    return await modal.present();
  }

  async carddetails() {
    this.modalController.dismiss();

    const modal = await this.modalController.create({
      component: CarddetailsPage
    });
    return await modal.present();
  }

  async payment(){
    this.jobService.createnewbill(this.newbill)
    this.jobERService.updatestatusCompleted(this.job.id)
    this.router.navigate(['eroverdue'])
    this.modalController.dismiss()
  }
}
