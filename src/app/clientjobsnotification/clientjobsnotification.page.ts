import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Job } from '../shared/models/Job';
import { JobService } from '../shared/services/job.service';

@Component({
  selector: 'app-clientjobsnotification',
  templateUrl: './clientjobsnotification.page.html',
  styleUrls: ['./clientjobsnotification.page.scss'],
})
export class ClientjobsnotificationPage implements OnInit {
  jobid: string;
  job: Job;
  alljobs: Job;

  constructor(private route: ActivatedRoute, private jobservice: JobService) { 
    this.jobid = this.route.snapshot.params.id;
    this.jobservice.getClientJobsById(this.jobid)
    .then(data => {
      this.job = data;
    })

    this.jobservice.getAllErrands()
    .subscribe(data => {
      this.alljobs = data;
    })
  }

  ngOnInit() {
  }

}
