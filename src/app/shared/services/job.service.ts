import { Injectable } from '@angular/core';
import { Job } from '../models/Job';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { JobDetail } from '../models/JobDetail';

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
}
