import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Job } from '../shared/models/Job';
import { JobERService } from '../shared/services/job-er.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-erjobs',
  templateUrl: './erjobs.page.html',
  styleUrls: ['./erjobs.page.scss'],
})
export class ERJobsPage implements OnInit {
  jobs: Job[];
  jobsApplied: Job[];
  jobsRejected: Job[];
  mySegment: string;
  useremail: string;
  
  constructor(private jobService: JobERService, private userService: UserService, private router: Router, private menuController: MenuController) {
    this.userService.observeAuthState(user=>{
      this.userService.showLoading();
      if(user){
        this.useremail = user.email;
        this.jobService.getErrandsAccepted(user.email)
        .subscribe(data=>{
          this.jobs = data
        })
        this.jobService.getErrandsApplied(user.email)
        .subscribe(data=>{
          this.jobsApplied = data
        })
        this.jobService.getAllErrandsRejected(user.email)
        .subscribe(data=>{
          this.jobsRejected = data
        })
      }
    })
    this.mySegment = 'ERJobs'
  }

  ngOnInit() {}

  ionViewWillEnter(){
    this.menuController.enable(true, 'second')
  }

  toClient(id: string) {
    this.router.navigate(['userprofile', id])
  }

  ionViewDidEnter() {
    this.jobService.getErrandsAccepted(this.useremail)
    .subscribe(async data=>{
      this.jobs = await data
    })
    this.jobService.getErrandsApplied(this.useremail)
    .subscribe(async data=>{
      this.jobsApplied = await data
    })
    this.jobService.getAllErrandsRejected(this.useremail)
        .subscribe(async data=>{
          this.jobsRejected = await data
        })
  }

}
