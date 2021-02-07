import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { ConfirmPaymentPage } from '../confirm-payment/confirm-payment.page';
import { Job } from '../shared/models/Job';
import { JobERService } from '../shared/services/job-er.service';
import { JobService } from '../shared/services/job.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-payment-client',
  templateUrl: './payment-client.page.html',
  styleUrls: ['./payment-client.page.scss'],
})
export class PaymentClientPage implements OnInit {
  errandId: string;
  job: Job;
  user: string;
  useremail: string;

  array: Job[] = [];
  acceptedarray: Job[] = [];

  constructor(private jobService: JobService, private jobERService: JobERService, private route: ActivatedRoute,
    private userService: UserService, private modalController: ModalController) { 
      this.errandId = this.route.snapshot.params.id;

      this.jobService.getSpecificJobsById(this.errandId)
      .then(data => {
        this.job = data
        this.userService.getUserInfoNoImage(this.job.client).subscribe(data => {
          this.user = data.name
        })
      })

    this.userService.observeAuthState(user => {
      this.useremail = user.email
      this.jobERService.getAllErrandsApplied(user.email).subscribe(data => {
        this.array = data
      })

      this.jobERService.getAllErrandsAccepted(user.email).subscribe(data => {
        this.acceptedarray = data
      })
    })
  }

  ngOnInit() {
    this.userService.showLoading();
  }

  async pay() {
    const modal = await this.modalController.create({
      component: ConfirmPaymentPage
    });
    return await modal.present();
  }

  toCalculate() {
    
  }

}
