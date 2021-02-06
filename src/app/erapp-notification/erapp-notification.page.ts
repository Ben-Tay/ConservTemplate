import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Job } from '../shared/models/Job';
import { NotSelected } from '../shared/models/NotSelected';
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
  unselected: NotSelected[]
  useremail: string;
  notification_count;
  mySegment: string;


  constructor(private jobService: JobERService, private userService: UserService) {
    this.userService.observeAuthState(user=>{
      this.userService.showLoading();
      if(user){
        this.useremail = user.email;
        
        this.jobService.getRejectedJobsByApplicant(this.useremail)
        .subscribe(data=>{
          if(data){
            this.jobsRejected =  data
          }
        })
        this.jobService.getAcceptedJobsByApplicant(user.email)
        .subscribe(data => {
          this.jobsAccepted = data;
        })
        this.jobService.getNonSelectedDetails(user.email)
        .subscribe(data => {
          this.unselected = data;
        })
      }
      this.mySegment = 'Upcoming Errands'

    })
  }
  
  ngOnInit() {

  }

}

