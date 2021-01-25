import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { ErrandRunner } from '../shared/models/ErrandRunner';
import { Job } from '../shared/models/Job';
import { JobService } from '../shared/services/job.service';

@Component({
  selector: 'app-rejectreason',
  templateUrl: './rejectreason.page.html',
  styleUrls: ['./rejectreason.page.scss'],
})
export class RejectreasonPage implements OnInit {
  rejectreasonForm: FormGroup;
  submitted: boolean = false;
  applicant: ErrandRunner;
  jobid: string;
  job: Job

  constructor(private jobservice: JobService, public navParams: NavParams, private toastCtrl: ToastController, private modalCtrl: ModalController) {
    //Get applicant to reject
    this.applicant = navParams.get("getapplicant")
    this.jobid = navParams.get("getjobid")
    //Declare formgroup for rejectreason
    this.rejectreasonForm = new FormGroup({
      reason: new FormControl('Not Suitable'),
      description: new FormControl('', [Validators.required])
    })

    this.jobservice.getRejectedApplicantsById(this.jobid)
    .then(async data => {
      this.job = data;
    })
  }

  ngOnInit() {
  }

  async onReject(p: Job) {
    this.submitted = true;

    if (this.rejectreasonForm.valid) {
      //Reject applicant for specificjob
      let reason = this.rejectreasonForm.value.reason
      let description = this.rejectreasonForm.value.description

      this.jobservice.rejectapplicantbyspecificjob(this.jobid, this.applicant, reason, description)

      let toast = await this.toastCtrl.create({
        message: "You have rejected the application by " + this.applicant.id,
        position: 'top',
        duration: 2000,
        color: 'danger'
      })
      toast.present()

      //dismiss modal
      this.modalCtrl.dismiss()

    }
  }
}
