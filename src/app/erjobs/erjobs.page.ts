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
  mySegment: string;
  useremail: string;
  
  constructor(private jobService: JobERService, private userService: UserService, private router: Router, private menuController: MenuController) {
    this.userService.observeAuthState(user=>{
      this.userService.showLoading();
      if(user){
        this.useremail = user.email;
        this.jobService.getAllErrandsAccepted(user.email)
        .subscribe(data=>{
          this.jobs = data
        })
        this.jobService.getAllErrandsApplied(user.email)
        .subscribe(data=>{
          this.jobsApplied = data
        })
      }
    })
    this.mySegment = 'ERJobs'
  }

  ngOnInit() {
    this.userService.observeAuthState(user=>{
      this.userService.showLoading();
      if(user){
        this.useremail = user.email;
        this.jobService.getAllErrandsAccepted(user.email)
        .subscribe(data=>{
          this.jobs = data
        })
        this.jobService.getAllErrandsApplied(user.email)
        .subscribe(data=>{
          this.jobsApplied = data
        })
      }
    })
    this.mySegment = 'ERJobs'
  }

  ionViewWillEnter(){
    this.menuController.enable(true, 'second')
  }

  toClient(id: string) {
    this.router.navigate(['userprofile', id])
  }

  ionViewDidEnter() {
    this.jobService.getAllErrandsAccepted(this.useremail)
    .subscribe(async data=>{
      this.jobs = await data
    })
    this.jobService.getAllErrandsApplied(this.useremail)
    .subscribe(async data=>{
      this.jobsApplied = await data
    })
  }

}
