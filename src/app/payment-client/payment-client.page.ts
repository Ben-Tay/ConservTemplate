import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConfirmPaymentPage } from '../confirm-payment/confirm-payment.page';

@Component({
  selector: 'app-payment-client',
  templateUrl: './payment-client.page.html',
  styleUrls: ['./payment-client.page.scss'],
})
export class PaymentClientPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async pay() {
    const modal = await this.modalController.create({
      component: ConfirmPaymentPage
    });
    return await modal.present();
  }
}
