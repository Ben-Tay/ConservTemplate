import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ReceivepaymentPage } from '../receivepayment/receivepayment.page';
import { ErrandRunner } from '../shared/models/ErrandRunner';
import { Job } from '../shared/models/Job';
import { Payment } from '../shared/models/Payment';
import { JobERService } from '../shared/services/job-er.service';
import { JobService } from '../shared/services/job.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-payment-errandrunner',
  templateUrl: './payment-errandrunner.page.html',
  styleUrls: ['./payment-errandrunner.page.scss'],
})
export class PaymentErrandrunnerPage implements OnInit {
  errandId: string;
  job: Job;
  newJob: Job;
  applicant: ErrandRunner;
  user: string;
  useremail: string;
  name: string;
  Bill: Payment;

  constructor(private jobService: JobService, private jobERService: JobERService, private route: ActivatedRoute,
    private userService: UserService, private modalController: ModalController) {
      this.errandId = this.route.snapshot.params.id;

    this.jobService.getAcceptedJobsById(this.errandId)
    .then(data => {
        this.job = data;
        this.userService.getUserInfoNoImage(this.job.applicant[0].id)
        .subscribe(data=>{
          this.name = data.name
        });
        this.newJob = new Job(this.job.errandname, this.job.category, this.job.status, this.job.client, this.job.date, this.job.description, this.job.time, this.job.endtime, this.job.id, this.job.price, this.job.notification_time)
        this.applicant = new ErrandRunner(this.job.applicant[0].date, this.job.applicant[0].id, this.job.applicant[0].applicationstatus)
        this.Bill = new Payment(this.errandId, this.job.price, parseFloat((this.job.price * 0.107).toFixed(2)), this.job.price + parseFloat((this.job.price * 0.107).toFixed(2)), '', 'Paid')
      })

    this.userService.observeAuthState(data=>{
      this.useremail = data
    })
  }

  ngOnInit() {
    this.userService.showLoading();
  }

  async receive() {
    const modal = await this.modalController.create({
      component: ReceivepaymentPage,
      componentProps: {
        fullamt: this.Bill,
        sJob: this.newJob,
        sApp: this.applicant
      },
      cssClass: 'modal-wrapper'
    });
    return await modal.present();
  }
}
