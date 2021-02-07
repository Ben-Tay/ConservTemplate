import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { ChangedatePage } from '../changedate/changedate.page';
import { RejectreasonPage } from '../rejectreason/rejectreason.page';
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
  appear: Boolean = false;
  rejectedapplicants: ErrandRunner[]
  reason = "Errand taken up by someone else"
  description = "The client has chosen someone else to take up the errand"

  constructor(private route: ActivatedRoute, private jobservice: JobService, private userservice: UserService, private router: Router, private toastCtrl: ToastController, private modalCtrl: ModalController) {
    this.jobid = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.jobservice.getSpecificJobsById(this.jobid)
      .then(data => {
        this.userservice.showLoading();
        this.job = data;
        this.jobapplicants = data.applicant;
        if (data.time <= new Date()) {
          this.appear = true
        }
      })
  }

  toERProfile(id: string) {
    this.router.navigate(['/userprofile', id])
  }

  async AcceptApplicant(applicant: ErrandRunner) {
    this.jobservice.getSpecificJobsById(this.jobid)
      .then(data => {
        this.job = data;
      }).then(() => {
        //Move document from JobsAvailable Collection to JobsAccepted Collection
        for (let a of this.jobapplicants) {
          if (a.id !== applicant.id) {
            this.jobservice.notifyNonSelectedApplicants(a.id, this.job, this.reason, this.description)
          }
        }
      }).then(() => {
        this.jobservice.getRejectedApplicantsById(this.jobid)
          .then(data => {
            this.rejectedapplicants = data.applicant
            for (let r of this.rejectedapplicants) {
              this.jobservice.notifyNonSelectedApplicants(r.id, this.job, this.reason, this.description)
            }

          })
      }).then(() => {
        this.jobservice.acceptapplicantrequest(this.job, applicant)

        this.jobservice.deletefromJobsAvailable(this.job)
      })
        let toast = await this.toastCtrl.create({
          message: "You have accepted this errand request",
          position: 'top',
          duration: 2000,
          color: 'success'
        })
        toast.present()
    
        this.router.navigate(['clientjobs'])
   
  }

  async RejectApplicant(applicant: ErrandRunner) {

    //create modal to hold rejectreasonpage
    let modal = await this.modalCtrl.create({
      component: RejectreasonPage,
      componentProps: {
        getapplicant: applicant,
        getjobid: this.jobid,
      },
      cssClass: 'modal-wrapper'

    });
    //Present modal 
    modal.onDidDismiss().then(() => {
      this.ngOnInit()
    });
    modal.present()
  }

  async changedate() {
    //create modal to hold rejectreasonpage
    let modal = await this.modalCtrl.create({
      component: ChangedatePage,
      componentProps: {
        getjobid: this.jobid
      },
      cssClass: 'modal-wrapper'

    });
    //Present modal
    modal.onDidDismiss().then(() => {
      this.router.navigate(['clientjobs'])
    });
    modal.present()
  }


  async DeleteErrand(job: Job) {
    this.jobservice.getSpecificJobsById(this.jobid)
      .then(data => {
        this.job = data;
      }).then(() => {
        for (let a of this.jobapplicants) {
          const delete_reason = "Errand deleted"
          const delete_description = "The client has deleted the errand"
          this.jobservice.notifyNonSelectedApplicants(a.id, this.job, delete_reason, delete_description)
        }
      }).then(() => {
        this.jobservice.deletefromJobsAvailable(this.job)
      })
    let toast = await this.toastCtrl.create({
      message: "You have deleted the errand with the ID: " + job.id,
      position: 'top',
      duration: 2000,
      color: 'danger'
    })
    toast.present()

    this.router.navigate(['clientjobs'])
  }

}
