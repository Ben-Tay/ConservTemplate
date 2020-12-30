import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import	firebase	from	'firebase/app';	
import	'firebase/analytics';	

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'My appointments',
      url: '/my-appointments',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    var firebaseConfig = {
      apiKey: "AIzaSyD2XKO_8KmfDPZorLAf38zJHFWyQa8TwXc",
      authDomain: "conserv-ebe60.firebaseapp.com",
      projectId: "conserv-ebe60",
      storageBucket: "conserv-ebe60.appspot.com",
      messagingSenderId: "164552467063",
      appId: "1:164552467063:web:732fe2d96f1123601a5c72",
      measurementId: "G-VF82F4JWRC"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
}
