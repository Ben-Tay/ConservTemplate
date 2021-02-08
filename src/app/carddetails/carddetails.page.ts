import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { PaymentcompletePage } from '../paymentcomplete/paymentcomplete.page';
import { ErrandRunner } from '../shared/models/ErrandRunner';
import { Job } from '../shared/models/Job';
import { Payment } from '../shared/models/Payment';
import { JobService } from '../shared/services/job.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-carddetails',
  templateUrl: './carddetails.page.html',
  styleUrls: ['./carddetails.page.scss'],
})
export class CarddetailsPage implements OnInit {
  CardNoForm: FormGroup;
  CardDetailsForm: FormGroup;
  cardNo: number;
  expiryDate: Date;
  securityCode: number;
  bill: Payment;
  job: Job;
  applicant: ErrandRunner;
  creditCardTypes = [
    "Visa",
    "AmericanExpress",
    "MasterCard"
  ]
  carderror: string;


  constructor(private modalController: ModalController, public navParams: NavParams, public jobService: JobService, private userService: UserService, private formBuilder: FormBuilder) {
    this.bill = navParams.get("fullamt")
    this.job = navParams.get('sJob')
    this.applicant = navParams.get('sApp')

    this.CardNoForm = new FormGroup({
      cardType: new FormControl('Visa'),
      creditCard: new FormControl('', RxwebValidators.creditCard ({fieldName:'cardType'})),
    })

    this.CardNoForm = new FormGroup({
      expiryDate: new FormControl('', [Validators.required]),
      securitycode: new FormControl('', Validators.compose([
        Validators.maxLength(3),
        Validators.required,
      ]))
    })
  }

  ngOnInit() {
  }

  async confirm() {
    if(this.CardNoForm.valid){
      this.jobService.createnewbill(this.bill)
      this.jobService.changeJobsAcceptedtoJobsCompleted(this.job, this.applicant)
      this.jobService.deletefromJobsAccepted(this.job)
      this.modalController.dismiss().then(user=>{
      }).catch(error => {
        this.carderror = error.message;
      })

      const modal = await this.modalController.create({
        component: PaymentcompletePage
      });
      return await modal.present();
    } 
  }

  validation_messages = {
    'expiryDate': [
      { type: 'required', message: 'Valid thru (MM/YY) is required.' }
    ],
    'securityCode': [
      { type: 'required', message: 'Security Code is required'},
      { type: 'maxlength', message: 'Password must be 3 characters only.' }
    ],
  };
}
