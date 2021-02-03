import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonButton, MenuController } from '@ionic/angular';
import { Job } from '../shared/models/Job';
import { JobService } from '../shared/services/job.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-clientoverdue',
  templateUrl: './clientoverdue.page.html',
  styleUrls: ['./clientoverdue.page.scss'],
})
export class ClientoverduePage implements OnInit {
  job: Job[];
  jobsAccepted: Job[];
  jobsconfirmed: Job[];
  jobsexpired: Job[];
  client: string;

  mySegment: string;

  @ViewChild('monthbutton', { static: false }) monthbtn: IonButton;
  @ViewChild('datebutton', { static: false }) datebtn: IonButton;

  constructor(private userservice: UserService, private jobservice: JobService, private router: Router, private menuController: MenuController) {
  }

  ngOnInit() {
    this.userservice.showLoading();
    this.userservice.observeAuthState(user => {
      if (user) {
        this.client = user.email;
        this.jobservice.getAllAvailableOverdueJobsByClient(this.client)
          .subscribe(data => {
            this.job = data;
          })
        this.jobservice.getAllOverdueJobsByClient(this.client)
          .subscribe(data => {
            this.jobsAccepted = data;
          })
        this.jobservice.getCompletedJobsByClient(this.client)
          .subscribe(data => {
            this.jobsconfirmed = data
          })
        this.jobservice.getExpiredJobsByClient(this.client)
          .subscribe(data => {
            this.jobsexpired = data
          })
        this.mySegment = 'ClientJobsOverdue'

      }
    })
  }

  ionViewWillEnter() {
    this.menuController.enable(true, 'first')
  }

  ionViewDidEnter() {
    this.mySegment = "ClientJobsOverdue"
  }

  toERProfile(id: string) {
    this.router.navigate(['/userprofile', id])
  }

  ExpiringJobs(job: Job) {
    this.jobservice.expireJobById(job)
    this.segmentChanged('ClientJobsOverdue')
  }

  segmentChanged(mySegment) {
    if (mySegment == 'ClientJobsOverdue') {
      this.jobservice.getAllAvailableOverdueJobsByClient(this.client)
        .subscribe(data => {
          this.job = data;
        })
      this.jobservice.getAllOverdueJobsByClient(this.client)
        .subscribe(data => {
          this.jobsAccepted = data;
        })
    }
    else if (mySegment == 'JobsCompleted') {
      this.jobservice.getCompletedJobsByClient(this.client)
        .subscribe(data => {
          this.jobsconfirmed = data
        })
    }
    else if (mySegment == 'JobsExpired') {
      this.jobservice.getExpiredJobsByClient(this.client)
        .subscribe(data => {
          this.jobsexpired = data
        })
    }
  }

  toApplicants(id: string) {
    this.router.navigate(['clientjobsnotification', id])
  }

}
