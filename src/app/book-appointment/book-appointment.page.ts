import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { NavController, ToastController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { JobService } from '../shared/services/job.service';
import { JobDetail } from '../shared/models/JobDetail';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.page.html',
  styleUrls: ['./book-appointment.page.scss'],
})
export class BookAppointmentPage implements OnInit {
  makerequestForm: FormGroup;
  client: string;
  pickerOpt = {
    backdropDismiss: false,
  }
  userEmail: string;
  categories: string[];
  time;
  date: String = new Date().toISOString();
  min_time = "06:30";
  max_time = "11:59";


  constructor(private jobService: JobService, private toastCtrl: ToastController, private formbuilder: FormBuilder) {
    this.categories = ['Grocery', 'ElderCare', 'Babysit', 'Others']
    this.makerequestForm = this.formbuilder.group({
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

  validation_messages = {
    'errandname': [
      { type: 'required', message: 'Errand Name is required.' }
    ],
    'category': [
      { type: 'required', message: 'Category is required' }
    ],
    'description': [
      { type: 'required', message: 'Description is required' }
    ],
    'date': [
      { type: 'required', message: 'Date is required' },
    ],
    'time': [
      { type: 'required', message: 'Time is required' }
    ]
  }
}




