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
    
    this.jobService.getSpecificJobsById(this.errandId)
    .then(data =>{
      this.job = data
    })
  }

  ngOnInit() {
  }

}
