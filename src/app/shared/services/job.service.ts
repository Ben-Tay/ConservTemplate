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

  createnewjobrequest(details: JobDetail, errandname: string, category: string, client: string) {

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

  getAllJobsByClient(client: string): Observable<any> {
    return new Observable(observer => {
      // Read collection '/JobsAvailable'
      firebase.firestore().collection('JobsAvailable').where('client', '==', client).onSnapshot(collection => {
        let array = [];
        collection.forEach(doc => {

          // Add job into array if there's no error
          try {
            let jobdata = doc.data()
            let job = new Job(jobdata.errandname, jobdata.category, jobdata.status, jobdata.client);
            array.push(job);

            // Read subcollection '/JobsAvailable/<autoID>/Details'
            let dbDetails = firebase.firestore().collection('JobsAvailable/' + doc.id + '/Details');
            dbDetails.onSnapshot(detailsCollection => {
              job.details = []; // Empty array
              detailsCollection.forEach(detailDoc => {
                let detaildata = detailDoc.data()
                let detail = new JobDetail(detaildata.title, detaildata.date, detaildata.description, detaildata.time);
                job.details.push(detail);
              });
            });
          } catch (error) { }

        });

        observer.next(array);

      });
    });
  }


}
