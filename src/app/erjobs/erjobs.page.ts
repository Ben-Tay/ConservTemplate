import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Job } from '../shared/models/Job';
import { JobService } from '../shared/services/job.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-erjobs',
  templateUrl: './erjobs.page.html',
  styleUrls: ['./erjobs.page.scss'],
})
export class ERJobsPage implements OnInit {
  jobs: Job[];
  jobsApplied: Job[];

  constructor(private jobService: JobService, private userService: UserService, private router: Router, private menuController: MenuController) {
    this.userService.observeAuthState(user=>{
      if(user){
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
  }

  ngOnInit() {
    this.userService.showLoading();
    this.ionViewWillEnter()
  }

  ionViewWillEnter(){
    this.menuController.enable(true, 'second')
  }

  toClient(id: string) {
    this.router.navigate(['userprofile', id])
  }

}
