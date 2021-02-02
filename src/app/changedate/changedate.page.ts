import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavParams, ToastController, ModalController } from '@ionic/angular';
import { ErrandRunner } from '../shared/models/ErrandRunner';
import { Job } from '../shared/models/Job';
import { JobService } from '../shared/services/job.service';

@Component({
  selector: 'app-changedate',
  templateUrl: './changedate.page.html',
  styleUrls: ['./changedate.page.scss'],
})
export class ChangedatePage implements OnInit {
  changedateForm: FormGroup;
  submitted: boolean = false;
  applicant: ErrandRunner;
  jobid: string;
  job: Job

  constructor(private jobservice: JobService, public navParams: NavParams, private toastCtrl: ToastController, private modalCtrl: ModalController) {
  }

  ngOnInit() {
  }

}
