import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { ReviewService } from '../shared/services/Review.service';
@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  targetEmail: any;
  data: any;
  userEmail: any;
  constructor(private userService: UserService, private reviewService: ReviewService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.data = {};
    this.targetEmail = this.route.snapshot.params.email;
    console.log(this.targetEmail);

    this.userService.observeAuthState(user => {
      if (user) {
        this.userEmail = user.email;
      }
      else {
        this.userEmail = undefined;
      }
    });
  }

  postReview() {
    this.reviewService.createReview(this.data.comment, this.userEmail, this.targetEmail).then(data=>{
      this.router.navigate(['userprofile', this.targetEmail])
    });
  }

}
