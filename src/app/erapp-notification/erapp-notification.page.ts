import { Component, OnInit } from '@angular/core';
import { ErrandRunner } from '../shared/models/ErrandRunner';
import { Job } from '../shared/models/Job';
import { JobERService } from '../shared/services/job-er.service';
import { JobService } from '../shared/services/job.service';
import { UserService } from '../shared/services/user.service';


@Component({
  selector: 'app-erapp-notification',
  templateUrl: './erapp-notification.page.html',
  styleUrls: ['./erapp-notification.page.scss'],
})
export class ErappNotificationPage implements OnInit {
  jobsRejected: Job[];
  jobsAccepted: Job[];
  useremail: string;

  constructor(private jobService: JobERService, private userService: UserService, private clientjobservice: JobService) {
    this.userService.observeAuthState(user=>{
      this.userService.showLoading();
      if(user){
        this.useremail = user.email;

        this.jobService.getRejectedJobsByApplicant(user.email)
        .subscribe(data=>{
          this.jobsRejected = data
        })
        this.clientjobservice.getConfirmedJobsByClient(user.email)
        .subscribe(data => {
          this.jobsAccepted = data;
        })
      }
    })
   }

  ngOnInit() {
  }

}
