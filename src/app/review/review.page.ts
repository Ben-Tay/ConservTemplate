import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from '../shared/models/Review';
import { ReviewService } from '../shared/services/Review.service';
import { User } from '../shared/models/User';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {
  reviews: any;
  allReviews: any;
  user: any;
  userEmail: any;
  targetEmail: any;
  allratings: number = 0;
  noreview: number = 0;
  average: number = 0;

  constructor(private reviewService: ReviewService, private userService: UserService, private router: Router, private route: ActivatedRoute) {
    this.reviews=[];
    this.allReviews=[];
  }

  ngOnInit() {
    this.userService.observeAuthState(user => {
      if (user) {
        this.userEmail = user.email;
        this.user = user;
        this.allReviews=[];
        this.targetEmail = this.route.snapshot.params.email
        this.reviews = this.reviewService.readReview(this.targetEmail).subscribe(doc => {
          this.reviews = doc;
          for(var review of this.reviews){
            console.log(review);
            this.allratings = this.allratings + parseInt(review.starReview)
            this.noreview = this.noreview + 1
            let newData = {
              'comment' : review.comment,
              'starReview' : parseInt(review.starReview),
              'from' : review.from
            }
            this.allReviews.push(newData);
          }
          this.average = parseInt((this.allratings/this.noreview).toString())
        });
      }
      else 
      {
          this.userEmail = undefined;
      }
    });
    
  }

}

