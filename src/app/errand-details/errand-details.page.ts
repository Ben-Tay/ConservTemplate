import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
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
  user: string;

  constructor(private jobService: JobService, private route: ActivatedRoute, 
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
          this.jobService.applyjobs(this.errandId, user.email, new Date()).then(async retrieve=>{
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
