import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Job } from '../shared/models/Job';
import { JobERService } from '../shared/services/job-er.service';
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
  rejectedcount;
  notification_count;

  constructor(private jobService: JobERService, private userService: UserService, private navCtrl: NavController) {
    this.userService.observeAuthState(user=>{
      this.userService.showLoading();
      if(user){
        this.useremail = user.email;
        
        this.jobService.getRejectedJobsByApplicant(this.useremail)
        .subscribe(data=>{
          this.jobsRejected =  data
          this.rejectedcount.push("hi")
          this.notification_count = Object.keys(this.jobsRejected).length
        })
        this.jobService.getAcceptedJobsByApplicant(user.email)
        .subscribe(data => {
          this.jobsAccepted = data;

        })
      }
    })
  }
  
  ngOnInit() {

  }

}

