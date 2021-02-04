import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from './shared/services/user.service';
import	firebase	from	'firebase/app';	
import	'firebase/analytics';	

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers:  [ UserService ]

})
export class AppComponent {
  navigate: any;
  navigateER: any;
  badge = 6;
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
  ) {
    this.initializeApp();
    this.sideMenu();
    this.sideMenuER();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
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
    });
  }

  sideMenu()
  {
    this.navigate =
    [
      {
        title : "My Errands",
        url   : "clientjobs",
        icon  : "briefcase"
      },
      {
        title : "Make Errand Request",
        url   : "/book-appointment",
        icon  : "filing"
      },
      {
        title : "Pending, Completed & Expired Errands",
        url   : "/clientoverdue",
        icon  : "timer"
      },
      {
        title : "Notifications",
        url   : "app-notification",
        icon  : "notifications",
        badge : this.badge
      }
    ]
  }

  sideMenuER()
  {
    this.navigateER =
    [
      {
        title : "My Errands",
        url   : "/erjobs",
        icon  : "briefcase"
      },
      {
        title : "Find Errands",
        url   : "/all-errand-requests",
        icon  : "search"
      },
      {
        title : "Pending, Completed & Expired Errands",
        url   : "/eroverdue",
        icon  : "timer"
      },
      {
        title : "Notifications",
        url   : "erapp-notification",
        icon  : "notifications",
        badge : this.badge
      }
    ]
  }
}
