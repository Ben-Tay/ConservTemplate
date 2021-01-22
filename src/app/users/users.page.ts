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
 
  }



