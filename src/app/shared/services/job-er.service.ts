import { Injectable } from '@angular/core';
import { Job } from '../models/Job';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { ErrandRunner } from '../models/ErrandRunner';

@Injectable({
  providedIn: 'root'
})
export class JobERService {

  constructor() { }

  getAllErrandsExcept(id: string): Observable<any> {
    return new Observable(observer => {
      // Read collection '/JobsAvailable'
      const ref = firebase.firestore().collection('JobsAvailable')
      ref.where('client', '!=', id).onSnapshot(collection => {
        let array = [];
        collection.forEach(doc => {

          // Add jobs into array if there's no error
          try {
            const docRef = ref.doc(doc.id)
            docRef.collection('Applicants').doc(id).get().then(sdoc => {
              if(sdoc.exists){
                return;
              }
              else{
                let loan = new Job(doc.data().errandname, doc.data().category, doc.data().status, doc.data().client, doc.data().date.toDate(), doc.data().description, doc.data().time, doc.id, doc.data().price);
                array.push(loan);
              }
            })
          } catch (error) { }

        });
        observer.next(array);
      });
    });
  }

  applyjobs(id: string, ER: ErrandRunner) {
    return firebase.firestore().collection('JobsAvailable').doc(id).collection('Applicants').get().then(collection => {
      let y = false

      collection.forEach(doc => {
        if (doc.id == ER.id) {
          y = true
        }
      })

      if (y == false) {
        firebase.firestore().collection('JobsAvailable').doc(id)
          .collection('Applicants').doc(ER.id).set({
            date: ER.date,
            applicationstatus: ER.applicationstatus
          })
      }
      return y
    })
  }

  getAllErrandsApplied(id: string): Observable<any> {
    return new Observable(observer => {
      // Read collection '/JobsAvailable'
      const ref = firebase.firestore().collection('JobsAvailable')
      ref.onSnapshot(collection => {
        let array = [];
        
        collection.forEach(doc => {
          // Add jobs into array if there's no error
          try {
            const docRef = ref.doc(doc.id)
            docRef.collection('Applicants').where('applicationstatus', '==', 'Pending').get().then(sdoc => {
              let applied = null
              sdoc.forEach(ssdoc => {
                if (ssdoc.id === id) {
                  applied = true
                }
                else{
                  applied = false
                }

                if (applied === true) {
                  let loan = new Job(doc.data().errandname, doc.data().category, doc.data().status, doc.data().client, doc.data().date.toDate(), doc.data().description, doc.data().time, doc.id, doc.data().price);
                  array.push(loan);
                }
              })
            })
          } catch (error) { }

        });
        observer.next(array);
      });
    });
  }

  getAllErrandsRejected(id: string): Observable<any> {
    return new Observable(observer => {
      // Read collection '/JobsAvailable'
      const ref = firebase.firestore().collection('JobsAvailable')
      ref.onSnapshot(collection => {
        let array = [];
        
        collection.forEach(doc => {
          // Add jobs into array if there's no error
          try {
            const docRef = ref.doc(doc.id)
            docRef.collection('Applicants').where('applicationstatus', '==', 'Rejected').get().then(sdoc => {
              let applied = null
              sdoc.forEach(ssdoc => {
                if (ssdoc.id === id) {
                  applied = true
                }
                else{
                  applied = false
                }

                if (applied === true) {
                  let loan = new Job(doc.data().errandname, doc.data().category, doc.data().status, doc.data().client, doc.data().date.toDate(), doc.data().description, doc.data().time, doc.id, doc.data().price);
                  array.push(loan);
                }
              })
            })
          } catch (error) { }

        });
        observer.next(array);
      });
    });
  }

  getAllErrandsAccepted(id: string): Observable<any> {
    return new Observable(observer => {
      // Read collection '/JobsAccepted'
      const ref = firebase.firestore().collection('JobsAccepted')
      ref.onSnapshot(collection => {
        let array = [];
        let applied = false
        collection.forEach(doc => {
          // Add jobs into array if there's no error
          try {
            const docRef = ref.doc(doc.id)
            docRef.collection('Applicant').get().then(sdoc => {
              sdoc.forEach(ssdoc => {
                if (ssdoc.id === id) {
                  applied = true
                }
                else {
                  applied = false
                }

                if (applied === true) {
                  let loan = new Job(doc.data().errandname, doc.data().category, doc.data().status, doc.data().client, doc.data().date.toDate(), doc.data().description, doc.data().time, doc.id, doc.data().price);
                  array.push(loan);
                }
              })
            })
          } catch (error) { }

        });
        observer.next(array);
      });
    });
  }
}
