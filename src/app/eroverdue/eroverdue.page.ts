import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Job } from '../shared/models/Job';
import { NotSelected } from '../shared/models/NotSelected';
import { JobERService } from '../shared/services/job-er.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-eroverdue',
  templateUrl: './eroverdue.page.html',
  styleUrls: ['./eroverdue.page.scss'],
})
export class ERoverduePage implements OnInit {
  jobs: Job[];
  jobsCompleted: Job[];
  jobsCompletedNP: Job[];
  jobsExpired: Job[];
  mySegment: string;
  useremail: string;
  jobsRejectedCount: Job[];
  jobsAcceptedCount: Job[];
  unselected: NotSelected[];


  constructor(private jobService: JobERService, private userService: UserService, private router: Router, private menuController: MenuController) {
    this.userService.observeAuthState(user => {
      this.userService.showLoading();
      if (user) {
        this.useremail = user.email;
        this.jobService.getAllErrandsOverdue(user.email)
          .subscribe(data => {
            this.jobs = data
          })
        this.jobService.getAllErrandsCompletedPaid(user.email)
          .subscribe(data => {
            this.jobsCompleted = data
          })
        this.jobService.getAllErrandsCompletedReceived(user.email)
          .subscribe(data => {
            this.jobsCompletedNP = data
          })
        this.jobService.getAllErrandsExpired(user.email)
          .subscribe(data => {
            this.jobsExpired = data
          })
        this.jobService.getRejectedJobsByApplicant(this.useremail)
          .subscribe(data => {
            if (data) {
              this.jobsRejectedCount = data
            }
          })
        this.jobService.getAcceptedJobsByApplicant(user.email)
          .subscribe(data => {
            this.jobsAcceptedCount = data;
          })
        this.jobService.getNonSelectedDetails(user.email)
          .subscribe(data => {
            this.unselected = data;
          })
      }
    })
    this.mySegment = 'ERJobsO'
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuController.enable(true, 'second')
  }

  toClient(id: string) {
    this.router.navigate(['userprofile', id])
  }

  ionViewDidEnter() {
    this.jobService.getAllErrandsOverdue(this.useremail)
      .subscribe(async data => {
        this.jobs = await data
      })
    this.jobService.getAllErrandsCompletedPaid(this.useremail)
      .subscribe(async data => {
        this.jobsCompleted = await data
      })
    this.jobService.getAllErrandsCompletedReceived(this.useremail)
      .subscribe(data => {
        this.jobsCompletedNP = data
      })
    this.jobService.getAllErrandsExpired(this.useremail)
      .subscribe(async data => {
        this.jobsExpired = await data
      })
  }

  toReceive() {
    this.router.navigate(['payment-errandrunner'])
  }

}
