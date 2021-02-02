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
        this.jobservice.getAllOverdueJobsByClient(this.client)
          .subscribe(data => {
            this.job = data;
          })
        this.jobservice.getCompletedJobsByClient(this.client)
          .subscribe( data => {
            this.jobsconfirmed = data
          })
        this.jobservice.getExpiredJobsByClient(this.client)
          .subscribe( data => {
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
    this.jobservice.getCompletedJobsByClient(this.client)
      .subscribe(async data => {
        this.jobsconfirmed = await data
      })
    this.jobservice.getExpiredJobsByClient(this.client)
      .subscribe(async data => {
        this.jobsexpired = await data
      })
  }

  toERProfile(id: string) {
    this.router.navigate(['/userprofile', id])
  }

  ExpiringJobs(id: string){
    this.jobservice.getSpecificAcceptedJobsById(id, this.client)
    .subscribe(data=>{
      this.jobservice.expireJobById(data, data.applicant)
    })
  }

}
