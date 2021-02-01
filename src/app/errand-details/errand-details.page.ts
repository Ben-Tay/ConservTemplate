import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { isThisISOWeek } from 'date-fns';
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

  array: Job[] = [];
  acceptedarray: Job[] = [];

  constructor(private jobService: JobService, private jobERService: JobERService, private route: ActivatedRoute,
    private userService: UserService, private router: Router, private toastController: ToastController) {
    this.errandId = this.route.snapshot.params.id;

    this.jobService.getSpecificJobsById(this.errandId)
      .then(data => {
        this.job = data
        this.userService.getUserInfoNoImage(this.job.client).subscribe(data => {
          this.user = data.name
        })
      })

    this.userService.observeAuthState(user => {
      this.jobERService.getAllErrandsApplied(user.email).subscribe(data => {
        this.array = data
      })

      this.jobERService.getAllErrandsAccepted(user.email).subscribe(data=>{
        this.acceptedarray = data
      })
    })
  }

  ngOnInit() {
    this.userService.showLoading();
  }

  applyErrand() {
    //Check user is logged in
    this.userService.observeAuthState(user => {
      if (user) {
        let ERdetails = new ErrandRunner(new Date(), user.email, 'Pending')

        //If array is not 0 then check
        if(this.acceptedarray.length != 0){
          this.acceptedarray.forEach(async mdoc=>{
            if (mdoc.date.getDate() != this.job.date.getDate()) {
              if (this.array.length != 0) {
                this.array.forEach(async doc => {
                  if (doc.date.getDate() != this.job.date.getDate()) {
                    this.successfullyapplied(ERdetails)
                  }
                  else {
                    if(doc.time.getTime()>=this.job.endtime.getTime()||doc.endtime.getTime()<=this.job.time.getTime()){
                      this.successfullyapplied(ERdetails)
                    }
                    else{
                      const toast = await this.toastController.create({
                        message: 'This job is clashing with a job you have applied',
                        duration: 2000,
                        position: 'top',
                        color: 'secondary'
                      });
                      toast.present();
                      this.router.navigate(['/all-errand-requests'])
                    }
                  }
                })
              }
              else {
                this.successfullyapplied(ERdetails)
              }
            }
            else {
              if(mdoc.time.getTime()>=this.job.endtime.getTime() || mdoc.endtime.getTime()<=this.job.time.getTime()){
                if (this.array.length != 0) {
                  this.array.forEach(async doc => {
                    if (doc.date.getDate() != this.job.date.getDate()) {
                      this.successfullyapplied(ERdetails)
                    }
                    else {
                      if(doc.time.getTime()>=this.job.endtime.getTime() || doc.endtime.getTime()<=this.job.time.getTime()){
                        this.successfullyapplied(ERdetails)
                      }
                      else{
                        const toast = await this.toastController.create({
                          message: 'This job is clashing with a job you have applied',
                          duration: 2000,
                          position: 'top',
                          color: 'secondary'
                        });
                        toast.present();
                        this.router.navigate(['/all-errand-requests'])
                      }
                    }
                  })
                }
                else {
                  this.successfullyapplied(ERdetails)
                }
              }
              else{
                const toast = await this.toastController.create({
                  message: 'This job is clashing with a job you have',
                  duration: 2000,
                  position: 'top',
                  color: 'secondary'
                });
                toast.present();
                this.router.navigate(['/all-errand-requests'])
              }
            }
          })
        }
      }
    })
  }

  successfullyapplied(ER: ErrandRunner) {
    return this.jobERService.applyjobs(this.errandId, ER).then(async retrieve => {
      const toast = await this.toastController.create({
        message: 'You have applied for this job',
        duration: 2000,
        position: 'top',
        color: 'secondary'
      });
      toast.present();
      this.router.navigate(['/all-errand-requests'])
    })
  }
}
