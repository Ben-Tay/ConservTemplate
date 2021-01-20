import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../shared/models/User';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.page.html',
  styleUrls: ['./userprofile.page.scss'],
})
export class UserprofilePage implements OnInit {
  errandId: string;
  user: User;
  userwithimg: User;
  address: string;

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.errandId = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.userService.showLoading();
    this.userService.getUserImage(this.errandId)
    .subscribe(async data => {
      this.user = data;
      this.address = data.address +', Singapore'
    })
  }

}
