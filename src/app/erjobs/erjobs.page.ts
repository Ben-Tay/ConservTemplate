import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Job } from '../shared/models/Job';
import { JobERService } from '../shared/services/job-er.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-erjobs',
  templateUrl: './erjobs.page.html',
  styleUrls: ['./erjobs.page.scss'],
})
export class ERJobsPage implements OnInit {
  jobs: Job[];
  jobsApplied: Job[];
  jobsRejected: Job[];
  mySegment: string;
  useremail: string;

  constructor(private jobService: JobERService, private userService: UserService, private router: Router, private menuController: MenuController) {
    this.userService.observeAuthState(user => {
      this.userService.showLoading();
      if (user) {
        this.useremail = user.email;
      }
    })
    this.mySegment = 'ERJobs'
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.menuController.enable(true, 'second')
  }

  toClient(id: string) {
    this.router.navigate(['userprofile', id])
  }

  ionViewDidEnter() {
    this.userService.showLoading()
    this.jobService.getErrandsAccepted(this.useremail)
      .subscribe(async data => {
        this.jobs = await data
      })
    this.jobService.getErrandsApplied(this.useremail)
      .subscribe(async data => {
        this.jobsApplied = await data
      })
    this.jobService.getAllErrandsRejected(this.useremail)
      .subscribe(async data => {
        this.jobsRejected = await data
      })
  }

  segmentChanged(mySegment: string) {
    this.userService.showLoading()
    if (mySegment == 'ERJobs') {
      this.jobService.getErrandsAccepted(this.useremail)
        .subscribe(async data => {
          this.jobs = await data
        })
    }
    else if (mySegment == 'ERApplied') {
      this.jobService.getErrandsApplied(this.useremail)
        .subscribe(async data => {
          this.jobsApplied = await data
        })
    }
    else if (mySegment == 'ERRejected') {
      this.jobService.getAllErrandsRejected(this.useremail)
        .subscribe(async data => {
          this.jobsRejected = await data
        })
    }
  }
}
