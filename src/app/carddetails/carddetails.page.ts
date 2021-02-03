import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { PaymentcompletePage } from '../paymentcomplete/paymentcomplete.page';

@Component({
  selector: 'app-carddetails',
  templateUrl: './carddetails.page.html',
  styleUrls: ['./carddetails.page.scss'],
})
export class CarddetailsPage implements OnInit {
  CardDetailsForm: FormGroup;
  cardNo: number;
  expiryDate: Date;
  securityCode: number;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async confirm() {
    this.modalController.dismiss();

    const modal = await this.modalController.create({
      component: PaymentcompletePage
    });
    return await modal.present();
  }
}
