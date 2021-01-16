import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
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
  

  constructor(private route: ActivatedRoute, private jobservice: JobService, private userservice: UserService, private router: Router, private toastCtrl: ToastController) { 
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

  toERProfile(id: string){
      this.router.navigate(['/userprofile', id])
  }

  async AcceptApplicant(applicant: ErrandRunner){
    this.jobservice.getSpecificJobsById(this.jobid)
    .then(data => {
      this.job = data;
    })

    //Move document from JobsAvailable Collection to JobsAccepted Collection
    this.jobservice.acceptapplicantrequest(this.job, applicant)
    .then(() => {
      this.jobservice.deletefromJobsAvailable(this.job)
    })

    let toast = await this.toastCtrl.create({
      message: "You have accepted this errand request",
      position: 'top',
      duration: 2000
    })
    toast.present()

    this.router.navigate(['jobs-accepted'])
    
  }
 
  

}
