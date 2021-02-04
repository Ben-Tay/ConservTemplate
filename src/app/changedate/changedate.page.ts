import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavParams, ToastController, ModalController } from '@ionic/angular';
import { ErrandRunner } from '../shared/models/ErrandRunner';
import { Job } from '../shared/models/Job';
import { JobService } from '../shared/services/job.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-changedate',
  templateUrl: './changedate.page.html',
  styleUrls: ['./changedate.page.scss'],
})
export class ChangedatePage implements OnInit {
  changedateForm: FormGroup;
  submitted: boolean = false;
  jobid: string;
  job: Job;
  ending_time;
  today = new Date()
  date = new Date()
  formdate;


  constructor(public userservice: UserService, private jobservice: JobService, public navParams: NavParams, private modalCtrl: ModalController, private toastCtrl: ToastController) {
    this.jobid = navParams.get("getjobid")
    this.jobservice.getSpecificJobsById(this.jobid)
      .then(data => {
        this.userservice.showLoading();
        this.job = data;
        this.formdate = new Date(data.date).toISOString()
      })

    this.changedateForm = new FormGroup({
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      endtime: new FormControl('', [Validators.required])
    })
  }

  async editanddimiss(sjob: Job) {
    const form = this.changedateForm
    const formvalue = this.changedateForm.value;
    const reportime = new Date(formvalue.time)
    const endtime = new Date(formvalue.endtime)
    const formdate = new Date(formvalue.date);
    const realreporttime = new Date(formdate.getFullYear(), formdate.getMonth(), formdate.getDate(), reportime.getHours(), reportime.getMinutes(), reportime.getSeconds(), reportime.getMilliseconds())
    const realendtime = new Date(formdate.getFullYear(), formdate.getMonth(), formdate.getDate(), endtime.getHours(), endtime.getMinutes(), endtime.getSeconds(), endtime.getMilliseconds())

    let newjob = new Job(sjob.errandname, sjob.category, sjob.status, sjob.client, new Date(this.changedateForm.value.date), sjob.description, realreporttime, realendtime, sjob.id, sjob.price)

    if (formdate.getDate() === this.today.getDate()) {
      if (realendtime.getTime() > realreporttime.getTime()) {
        if (realreporttime.getTime() >= this.today.getTime()) {
          if (form.valid) {
            this.jobservice.changedateandtime(newjob).then(data => {
              this.modalCtrl.dismiss();
            })
          }
        } else {
          let toast = await this.toastCtrl.create({
            message: "You cannot select a reporting time that is in the past",
            position: 'top',
            duration: 2000,
            color: 'danger'
          })
          toast.present()
        }
      } else {
        let toast = await this.toastCtrl.create({
          message: "Your end time cannot be equal to or earlier than your reporting time",
          position: 'top',
          duration: 2000,
          color: 'danger'
        })
        toast.present()
      }
    } else {
      if (realendtime.getTime() > realreporttime.getTime()) {
        if (form.valid) {
          this.jobservice.changedateandtime(newjob).then(data => {
            this.modalCtrl.dismiss();
          })
        }
      } else {
        let toast = await this.toastCtrl.create({
          message: "Your end time cannot be equal to or earlier than your reporting time",
          position: 'top',
          duration: 2000,
          color: 'danger'
        })
        toast.present()
      }
    }

  }

  ngOnInit() {
  }

  validation_messages = {
    'date': [
      { type: 'required', message: 'Date is required' },
    ],
    'time': [
      { type: 'required', message: 'Time is required' }
    ],
    'endtime': [
      { type: 'required', message: 'Ending Time is required' }
    ]
  }

}
