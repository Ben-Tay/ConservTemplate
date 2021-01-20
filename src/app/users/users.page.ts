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
  users: any;
  userEmail: any;
  userwithimg: User;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.users = {};
    this.userService.observeAuthState(user => {
      //	User	is	logged	in
      
      if (user) {
        this.userEmail = user.email;
        console.log(this.userEmail)
        console.log(user)
        let tempParam = this.userEmail;

        this.userService.getUserInfoNoImage(tempParam).subscribe(doc => {
          this.users = doc;
          console.log(doc);
          this.users.birthday = (new Date(this.users.birthday)).toDateString()
          this.userService.getUserImage(tempParam)
          .subscribe(async data => {
            this.userwithimg = data;
          })
        })
      }
      //	User	has	logged	out
      else {
        this.userEmail = undefined;
      }

    });
  }

  updatephoto() {
    this.router.navigate(['/updatephoto']);
  };

}
