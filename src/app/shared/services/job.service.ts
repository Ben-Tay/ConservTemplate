import { Injectable } from '@angular/core';
import { Job } from '../models/Job';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { JobDetail } from '../models/JobDetail';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor() { }

  createnewjobrequest(details: JobDetail, errandname: string, category: string, client: string){

    let job = new Job(errandname, category, 'Available', client)

    return firebase.firestore().collection('JobsAvailable').add({
      errandname: job.errandname,
      category: job.category,
      status: job.status,
      client: job.client
    }).then(doc => {
      job.id = doc.id;
      firebase.firestore().collection('JobsAvailable/' + doc.id + '/Details/').doc(details.title).set({
        date: details.date,
        description: details.description,
        time: details.time
      });
      return job;
    })
  }

  getAllErrands(): Observable<any> {
    return new Observable(observer => {
      // Read collection '/JobsAvailable'
      //firebase.firestore().collection('loans').orderBy('duedate').where('username', '==', id).onSnapshot
      firebase.firestore().collection('JobsAvailable').onSnapshot(collection => {
        let array = [];
        collection.forEach(doc => {

          // Add loan into array if there's no error
          try {
            let loan = new Job(doc.data().errandname, doc.data().category, doc.data().status, doc.data().client);
            array.push(loan);

            // Read subcollection '/loans/<autoID>/items'
            let dbItems = firebase.firestore().collection('JobsAvailable/' + doc.id + '/Details').doc('DetailDoc');
            dbItems.get().then(itemsCollection => {
              loan.details = []
              let item = new JobDetail(itemsCollection.id, itemsCollection.data().date, itemsCollection.data().description, itemsCollection.data().time);
              loan.details.push(item)
            });
          } catch (error) { }

        });
        observer.next(array);
      });
    });
  }
}
