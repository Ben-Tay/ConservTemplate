import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../shared/models/User';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {
  users: User;
  userwithimg: User;
  userEmail: any;

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router, private authService: UserService) {
  }

  ngOnInit() {
      this.userService.showLoading()
  
      this.userService.observeAuthState(user => {
        //	User	is	logged	in
        if (user) {
          this.userEmail = user.email;
          this.userService.getUserImage(user.email).subscribe(doc => {
            this.users = doc;
  
            })
          }
        //	User	has	logged	out
        else {
              this.userEmail = undefined;
            }
      });
    }
  
    ionViewWillEnter() {
      this.userService.getUserImage(this.userEmail).subscribe(doc => {
        this.users = doc;
        })
    }
  
    ionViewDidEnter() {
      this.userService.getUserImage(this.userEmail).subscribe(async doc => {
        this.userService.showLoading()
        this.users = await doc;
        })
    }

logout()	{	
  this.authService.logout();
  this.router.navigate(['/home'])	
  }

profile() {
  this.router.navigate(['users']);
  }

runnerpage() {
  this.router.navigate(['erjobs'])
  }

clientpage() {
  this.router.navigate(['clientjobs'])
  }
}
