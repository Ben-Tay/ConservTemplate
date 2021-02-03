import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CarddetailsPage } from '../carddetails/carddetails.page';
import { PaynowPage } from '../paynow/paynow.page';

@Component({
  selector: 'app-receivepayment',
  templateUrl: './receivepayment.page.html',
  styleUrls: ['./receivepayment.page.scss'],
})
export class ReceivepaymentPage implements OnInit {

  constructor(private modalController: ModalController, private router: Router) { }

  ngOnInit() {
  }

  async paynow() {
    this.modalController.dismiss();

    const modal = await this.modalController.create({
      component: PaynowPage
    });
    return await modal.present();
  }

  async carddetails() {
    this.modalController.dismiss();

    const modal = await this.modalController.create({
      component: CarddetailsPage
    });
    return await modal.present();
  }
}