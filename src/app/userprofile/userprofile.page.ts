import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../shared/models/User';
import { UserService } from '../shared/services/user.service';
import { JobService } from '../shared/services/job.service';
import { ReviewService } from '../shared/services/review.service';
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
  count: any;
  targetEmail: string;
  reviewCount: any;
  userEmail: any;
  users: User;
  constructor(private route: ActivatedRoute, private userService: UserService, private reviewService: ReviewService, private jobService: JobService) {
    this.errandId = this.route.snapshot.params.id;
    this.targetEmail = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.userService.showLoading();
    this.userService.getUserImage(this.errandId)
    .subscribe(async data => {
      this.user = data;
      this.address = data.address +', Singapore'
    })

    this.userService.observeAuthState(user => {
      //	User	is	logged	in
      if (user) {
        this.targetEmail = this.route.snapshot.params.id == undefined ? user.id : this.route.snapshot.params.id ;
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

    this.jobService.getCompletedJobs(this.userEmail, this.targetEmail).subscribe(doc => {
      this.count = doc;
    })
    this.reviewService.getReviewCount(this.targetEmail).subscribe(doc => {
      this.reviewCount = doc;
    })
  }

}
