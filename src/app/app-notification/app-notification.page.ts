import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Job } from '../shared/models/Job';
import { JobService } from '../shared/services/job.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-app-notification',
  templateUrl: './app-notification.page.html',
  styleUrls: ['./app-notification.page.scss'],
})
export class AppNotificationPage implements OnInit {
  useremail: string;
  jobsApplied: Job[]

  constructor(private userService: UserService, private jobService: JobService, private router: Router) {
  }

  ngOnInit() {
    this.userService.observeAuthState(user => {
      this.userService.showLoading();
      if (user) {
        this.useremail = user.email;
        this.jobService.getErrandsAppliedByClient(user.email)
          .subscribe(data => {
            this.jobsApplied = data;
          })
      }
    })
  }
  ionViewDidEnter(){
    this.ngOnInit()
  }

  toApplicant(id: string) {
    this.router.navigate(['clientjobsnotification', id])

  }
}
