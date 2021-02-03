import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-paymentcomplete',
  templateUrl: './paymentcomplete.page.html',
  styleUrls: ['./paymentcomplete.page.scss'],
})
export class PaymentcompletePage implements OnInit {

  constructor(private router: Router, private modalController: ModalController) { }

  ngOnInit() {
  }

  return() {
    this.modalController.dismiss();
    this.router.navigate(['homepage'])
  }
}
