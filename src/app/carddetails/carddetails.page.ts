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


  constructor(private modalController: ModalController, public navParams: NavParams, public jobService: JobService, private userService: UserService, private formBuilder: FormBuilder) {
    this.bill = navParams.get("fullamt")
    this.job = navParams.get('sJob')
    this.applicant = navParams.get('sApp')

    this.

    let securityCode = new FormControl('', Validators.compose([
      Validators.minLength(3),
      Validators.required,
    ]))
  }

  ngOnInit() {
    this.CardNoForm = this.formBuilder.group({
      cardType:['Visa'],
      creditCard:['',RxwebValidators.creditCard ({fieldName:'cardType'})]
    })
  }

  async confirm() {
    this.jobService.createnewbill(this.bill)
    this.jobService.changeJobsAcceptedtoJobsCompleted(this.job, this.applicant)
    this.jobService.deletefromJobsAccepted(this.job)
    this.modalController.dismiss();

    const modal = await this.modalController.create({
      component: PaymentcompletePage
    });
    return await modal.present();
  }
}
