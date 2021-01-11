import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientjobsnotification',
  templateUrl: './clientjobsnotification.page.html',
  styleUrls: ['./clientjobsnotification.page.scss'],
})
export class ClientjobsnotificationPage implements OnInit {
  jobid: string;

  constructor(private route: ActivatedRoute) { 
    this.jobid = this.route.snapshot.params.id;
  }

  ngOnInit() {
  }

}
