import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ErrandRunner } from '../shared/models/ErrandRunner';
import { Job } from '../shared/models/Job';
import { JobERService } from '../shared/services/job-er.service';
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
  user: string;

  constructor(private jobService: JobService, private jobERService: JobERService, private route: ActivatedRoute, 
    private userService: UserService, private router: Router, private toastController: ToastController) {
    this.errandId = this.route.snapshot.params.id;
    
    this.jobService.getSpecificJobsById(this.errandId)
    .then(data =>{
      this.job = data
      this.userService.getUserInfoNoImage(this.job.client).subscribe(data=>{
        this.user = data.name
      })
    })
  }

  ngOnInit() {
    this.userService.showLoading();
  }

  applyErrand(){
    this.userService.observeAuthState(user=>{
      if(user){
        if (!(user.email === this.job.client)){
          let ERdetails = new ErrandRunner(new Date(), user.email, 'Pending')
          this.jobERService.applyjobs(this.errandId, ERdetails).then(async retrieve=>{
            if(retrieve == true){
              const toast = await this.toastController.create({
                message: 'You have already applied for this errand',
                duration: 2000,
                position: 'top',
                color: 'secondary'
              });
              toast.present();
            }
          })
          this.router.navigate(['/all-errand-requests'])
        }
      }
    })
  }

  redirectprofile(){
    this.router.navigate(['/userprofile', this.job.client])
  }
}
