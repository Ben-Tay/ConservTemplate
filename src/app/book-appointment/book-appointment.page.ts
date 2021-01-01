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
  // private days = [];
  // private dayActive: string = "";
  // private hours = [
  //   "09:00:00", "09:10:00", "09:20:00", "09:30:00", "09:40:00", "09:50:00",
  //   "10:00:00", "10:10:00", "10:20:00", "10:30:00", "10:40:00", "10:50:00",
  // ];
  // private hourActive = "";

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
    if (this.makerequestForm.valid) {
      let report_date = this.makerequestForm.value.date
      let formatted_date = report_date.split('T')[0];
      
      const jobdetails = new JobDetail("DetailDoc", formatted_date,
        this.makerequestForm.value.description,
        this.time)

      this.jobService.createnewjobrequest(jobdetails,
        this.makerequestForm.value.errandname,
        this.makerequestForm.value.category,
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


  // checkDay (day: any) {
  //   this.dayActive = this.getStrDay(day);
  // }
  // checkHour (hour: string) {
  //   this.hourActive = hour;
  // }

  // generateDays () {
  //   let now = moment();
  //   for (let i = 0; i < 7; i++) {
  //     now.add(1, 'd');

  //     this.days.push({
  //       month: now.format('MMM'),
  //       day: now.format("DD"),
  //       dayname: now.format("ddd")
  //     })
  //   }

  //   this.checkDay(this.days[0])
  // }

  // getStrDay (day: any) {
  //   return `${day.month}-${day.day}-${day.dayname}`;
  // }

  // next () {
  //   this.navCtrl.navigateForward('pick-service')
  // }


