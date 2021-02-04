import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { JobService } from '../shared/services/job.service';
import { UserService } from '../shared/services/user.service';
import { ErrandCategory } from '../shared/models/ErrandCategory';
import { ThrowStmt } from '@angular/compiler';

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
  date = new Date().toISOString();
  correct_date: Date;
  min_time = "06:30";
  max_time = "11:59";
  time;
  end_time;
  ending_time;
  errandprice: ErrandCategory[];
  price: number;



  constructor(private jobService: JobService, private toastCtrl: ToastController, private formbuilder: FormBuilder, private userService: UserService, private menuController: MenuController, private jobservice: JobService) {
    this.categories = ['Grocery', 'ElderCare', 'Babysit', 'DogWalking', 'Delivery']
    this.makerequestForm = this.formbuilder.group({
      errandname: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      endtime: new FormControl('', [Validators.required])
    })
    this.userService.observeAuthState(user => {
      //	User	is	logged	in
      if (user) {
        this.client = user.email;
      }
    })
  }

  ngOnInit() {
    this.ionViewWillEnter()
  }

  ionViewWillEnter() {
    this.menuController.enable(true, 'first')
  }

  async onCreateRequest() {
    const form = this.makerequestForm
    const formvalue = this.makerequestForm.value;
    const formdate = new Date(formvalue.date);
    const reportime = new Date(formvalue.time)
    const endtime = new Date(formvalue.endtime)
    const realreporttime = new Date(formdate.getFullYear(), formdate.getMonth(), formdate.getDate(), reportime.getHours(), reportime.getMinutes(), reportime.getSeconds(), reportime.getMilliseconds())
    const realendtime = new Date(formdate.getFullYear(), formdate.getMonth(), formdate.getDate(), endtime.getHours(), endtime.getMinutes(), endtime.getSeconds(), endtime.getMilliseconds())

    if (form.valid) {
      this.jobservice.getErrandPricesByCategory(formvalue.category)
        .subscribe(data => {
          this.errandprice = data;
          for(let i of this.errandprice){
            this.price = i.price
          }
          this.jobService.createnewjobrequest(formvalue.errandname, formvalue.category,
            this.client, formdate, formvalue.description, realreporttime, realendtime, this.price)
        })


      let toast = await this.toastCtrl.create({
        message: "Your request has been created",
        position: 'top',
        duration: 2000
      })
      toast.present()
    }
    this.makerequestForm.reset()
  }

  onChangeCategory(value) {
    this.jobservice.getErrandPricesByCategory(value)
      .subscribe(data => {
        this.errandprice = data;
      })
  }

  onReportTimeChange(){
    this.ending_time = this.makerequestForm.value.time;
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
    ],
    'endtime': [
      { type: 'required', message: 'Ending Time is required' }
    ]
  }
}




