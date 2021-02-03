import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/models/User';
import { UserService } from '../shared/services/user.service';
import { JobService } from '../shared/services/job.service';
import { ReviewService } from '../shared/services/review.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  users: User;
  userEmail: any;
  userwithimg: User;
  count: any;
  targetEmail: string;
  reviewCount: any;
  constructor(private userService: UserService, private reviewService: ReviewService, private jobService: JobService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.userService.showLoading();

    this.userService.observeAuthState(user => {
      //	User	is	logged	in
      if (user) {
        this.targetEmail = this.route.snapshot.params.email == undefined ? user.email : this.route.snapshot.params.email ;
        this.userEmail = user.email;
        this.userService.getUserImage(this.targetEmail).subscribe(doc => {
          this.users = doc;
        })
        this.jobService.getCompletedJobs(this.userEmail, this.targetEmail).subscribe(doc => {
          this.count = doc;
        })
        this.reviewService.getReviewCount(this.targetEmail).subscribe(doc => {
          this.reviewCount = doc;
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



