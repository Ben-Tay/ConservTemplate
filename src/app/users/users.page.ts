import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/models/User';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  users: User;
  userEmail: any;
  userwithimg: User;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.userService.observeAuthState(user => {
      //	User	is	logged	in
      if (user) {
        this.userEmail = user.email;
        this.userService.getUserInfoNoImage(user.email).subscribe(doc => {
          this.users = doc;
          console.log(doc)
          this.userService.showLoading()

          this.userService.getUserImage(user.email)
            .subscribe(async data => {
              this.userwithimg = data;
            });
          })

        }
      //	User	has	logged	out
      else {
            this.userEmail = undefined;
          }
    });
  }

  ionViewDidEnter() {
    this.userService.getUserImage(this.userEmail)
      .subscribe(async data => {
        this.users = data;
      });
  }


}
