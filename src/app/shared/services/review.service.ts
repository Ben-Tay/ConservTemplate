import { Injectable } from '@angular/core';
import { Review } from '../models/Review';
import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth'
import 'firebase/firestore';
import 'firebase/storage';
import { Observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor() { }

  createReview(comment: string,starReview: string, from: string, to: string){
    // let review = new Review(Date.now(), comment, from, to);
    console.log(comment);
    console.log(starReview);
    let review = {
      id : Date.now(),
      comment : comment,
      starReview : starReview,
      from : from,
      to : to
    }
    return firebase.firestore().collection('review').add(review).then(() => {
      return review;
    })
  }

  readReview(to: string){
    return new Observable(observer => {
      firebase.firestore().collection('review').orderBy('to').onSnapshot(collection => {
        let allData = [];
        collection.forEach(doc => {
          if(doc.data().to == to){
            console.log("starreview : " + doc.data().starReview);
            let review = new Review(doc.data().id, doc.data().comment, doc.data().starReview, doc.data().from, doc.data().to);
            allData.push(review);
          }
        });
        observer.next(allData);
      });
    })


  }

  getReviewCount(to: string){
    return new Observable(observer => {
      firebase.firestore().collection('review').orderBy('to').onSnapshot(collection => {
        let allData = [];
        collection.forEach(doc => {
          if(doc.data().to == to){
            let review = new Review(doc.data().id, doc.data().comment, doc.data().from, doc.data().to);
            allData.push(review);
          }
        });
        observer.next(allData.length);
      });
    })


  }
}
