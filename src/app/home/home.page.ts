import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  slideOptions = {
    initialSlide: 1,
    speed: 500,
  };
  constructor(private router: Router) { }


  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }

  signup(){
    this.router.navigate(['/signup']);
  }

  login(){
    this.router.navigate(['/login']);
  }

  

}
