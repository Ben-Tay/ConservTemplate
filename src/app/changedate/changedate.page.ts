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

  constructor(public userservice: UserService, private jobservice: JobService,  public navParams: NavParams, private modalCtrl: ModalController) {
    this.jobid = navParams.get("getjobid")
    this.jobservice.getSpecificJobsById(this.jobid)
      .then(data => {
        this.userservice.showLoading();
        this.job = data;
      })
      
    this.changedateForm = new FormGroup({
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      endtime: new FormControl('', [Validators.required])
    })
  }

  editanddimiss(sjob: Job) {
    let newjob = new Job(sjob.errandname, sjob.category, sjob.status, sjob.client, new Date(this.changedateForm.value.date), sjob.description, new Date(this.changedateForm.value.time), new Date(this.changedateForm.value.endtime), sjob.id, sjob.price)

    this.jobservice.changedateandtime(newjob).then(data=>{
      this.modalCtrl.dismiss();
    })
  }

  ngOnInit() {
  }

  onReportTimeChange(){
    this.ending_time = this.changedateForm.value.time;
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
