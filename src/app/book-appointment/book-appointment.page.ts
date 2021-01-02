import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { NavController, ToastController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JobService } from '../shared/services/job.service';
import { JobDetail } from '../shared/models/JobDetail';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.page.html',
  styleUrls: ['./book-appointment.page.scss'],
})
export class BookAppointmentPage implements OnInit {
  makerequestForm: FormGroup;
  submitted: boolean = false;
  client: string;
  pickerOpt = {
    backdropDismiss: false,
  }
  userEmail: string;
  categories: string[];
  time;

  constructor(private jobService: JobService, private toastCtrl: ToastController) {
      this.categories = ['Grocery', 'ElderCare', 'Babysit','Others']
      this.makerequestForm = new FormGroup({
      errandname: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required])
    })

    
    
  }

  ngOnInit() {
  }

  async onCreateRequest() {
    this.submitted = true;
    this.client = "Amy"
    this.time = this.getTimeValue();
    const form = this.makerequestForm
    const formvalue = this.makerequestForm.value;
    if (form.valid) {
      const dateFormat = formvalue.date.split('T')[0]; 

      const jobdetails = new JobDetail("DetailDoc", dateFormat,
        formvalue.description,
        this.time)

      this.jobService.createnewjobrequest(jobdetails,
        formvalue.errandname,
        formvalue.category,
        this.client)

      let toast = await this.toastCtrl.create({
        message: "Your request has been created",
        position: 'top',
        duration: 2000
      })
      toast.present()
    }
  }

  getTimeValue() {
    this.time = this.makerequestForm.value.time
    let d = this.time.split('T')[1];
    let m = d.split(':')[0];
    let n = d.split(':')[1];
    var AmOrPm = m >= 12 ? 'pm' : 'am';
    m = (m % 12) || 12;
    this.time = m + ":" + n + " " + AmOrPm;
    return this.time;
  }
}




