import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrandRunner } from '../shared/models/ErrandRunner';
import { Job } from '../shared/models/Job';
import { JobService } from '../shared/services/job.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-clientjobsnotification',
  templateUrl: './clientjobsnotification.page.html',
  styleUrls: ['./clientjobsnotification.page.scss'],
})
export class ClientjobsnotificationPage implements OnInit {
  jobid: string;
  job: Job;
  jobapplicants: ErrandRunner[]

  constructor(private route: ActivatedRoute, private jobservice: JobService, private userservice: UserService) { 
    this.jobid = this.route.snapshot.params.id;

    this.jobservice.getSpecificJobsById(this.jobid)
    .then(data => {
      this.job = data;
      this.jobapplicants = data.applicant;
    })

  }

  ngOnInit() {
    this.userservice.showLoading();
  }
  

}
