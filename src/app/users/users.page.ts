import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/User';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  users: any;
  constructor(private userService: UserService) { 
    let tempParam = 'yqg@gmail.com';
    this.users = {};
    this.userService.getUserByEmail(tempParam).then(doc => {
      this.users = doc;
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  }

  ngOnInit() {
  }

}
