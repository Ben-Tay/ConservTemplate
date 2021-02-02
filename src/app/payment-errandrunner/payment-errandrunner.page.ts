import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ReceivepaymentPage } from '../receivepayment/receivepayment.page';

@Component({
  selector: 'app-payment-errandrunner',
  templateUrl: './payment-errandrunner.page.html',
  styleUrls: ['./payment-errandrunner.page.scss'],
})
export class PaymentErrandrunnerPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async receive() {
    const modal = await this.modalController.create({
      component: ReceivepaymentPage
    });
    return await modal.present();
  }

}
