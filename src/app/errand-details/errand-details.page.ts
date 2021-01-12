import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Job } from '../shared/models/Job';
import { JobService } from '../shared/services/job.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-errand-details',
  templateUrl: './errand-details.page.html',
  styleUrls: ['./errand-details.page.scss'],
})
export class ErrandDetailsPage implements OnInit {
  errandId: string;
  job: Job;
  jobname: string;
  jobcategory: string;
  jobclient: string;
  jobdescrip: string;
  jobdate: Date;
  jobTime: Time;

  constructor(private jobService: JobService, private route: ActivatedRoute, userService: UserService) {
    this.errandId = this.route.snapshot.params.id;
    
    this.jobService.getSpecificErrands(this.errandId)
    .subscribe(data =>{
      this.job = data
      this.jobname = this.job.errandname
      this.jobcategory = this.job.category
      this.jobclient = this.job.client
      this.jobdescrip = this.job.description
      this.jobdate = this.job.date
      this.jobTime = this.job.time
    })
  }

  ngOnInit() {
  }

}
