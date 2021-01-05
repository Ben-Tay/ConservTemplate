import { Component, OnInit } from '@angular/core';
import { Job } from '../shared/models/Job';
import { JobDetail } from '../shared/models/JobDetail';
import { JobService } from '../shared/services/job.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-clientjobs',
  templateUrl: './clientjobs.page.html',
  styleUrls: ['./clientjobs.page.scss'],
})
export class ClientjobsPage implements OnInit {
  job: Job[];
  client: string;

  constructor(private userservice: UserService, private jobservice: JobService) {
      // this.userservice.observeAuthState(user => {
      //   this.client = user.email;
      // })

      this.jobservice.getAllJobsByClient("Amy")
      .subscribe(data => {
        this.job = data;
      })
  }

  ngOnInit() {
  }

}
