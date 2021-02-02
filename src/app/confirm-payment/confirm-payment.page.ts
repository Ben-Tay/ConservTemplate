import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-confirm-payment',
  templateUrl: './confirm-payment.page.html',
  styleUrls: ['./confirm-payment.page.scss'],
})
export class ConfirmPaymentPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  confirm() {
    this.modalController.dismiss();
    }

}
