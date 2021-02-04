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
            if (doc.data().time.toDate().getDate() > new Date().getDate()) {
              const docRef = ref.doc(doc.id)
              docRef.collection('Applicants').doc(id).get().then(sdoc => {
                if (sdoc.exists) {
                  return;
                }
                else {
                  let loan = new Job(doc.data().errandname, doc.data().category, doc.data().status, doc.data().client, doc.data().date.toDate(), doc.data().description, doc.data().time.toDate(), doc.data().endtime.toDate(), doc.id, doc.data().price);
                  array.push(loan);
                }
              })
            }
          } catch (error) { }
        });
        observer.next(array);
      });
    });
  }


  getErrandsApplied(id: string): Observable<any> {
    return new Observable(observer => {
      // Read collection '/JobsAvailable'
      const ref = firebase.firestore().collection('JobsAvailable')
      ref.onSnapshot(collection => {
        let array = [];

        collection.forEach(doc => {
          // Add jobs into array if there's no error
          try {
            if (doc.data().time.toDate() > new Date()) {
              const docRef = ref.doc(doc.id)
              docRef.collection('Applicants').where('applicationstatus', '==', 'Pending').get().then(sdoc => {
                let applied = null
                sdoc.forEach(ssdoc => {
                  if (ssdoc.id === id) {
                    applied = true
                  }
                  else {
                    applied = false
                  }

                  if (applied === true) {
                    let loan = new Job(doc.data().errandname, doc.data().category, doc.data().status, doc.data().client, doc.data().date.toDate(), doc.data().description, doc.data().time.toDate(), doc.data().endtime.toDate(), doc.id, doc.data().price);
                    array.push(loan);
                  }
                })
              })
            }
          } catch (error) { }

        });
        observer.next(array);
      });
    });
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
                else {
                  applied = false
                }

                if (applied === true) {
                  let loan = new Job(doc.data().errandname, doc.data().category, doc.data().status, doc.data().client, doc.data().date.toDate(), doc.data().description, doc.data().time.toDate(), doc.data().endtime.toDate(), doc.id, doc.data().price);
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
            if (doc.data().date.toDate() > new Date()) {
              const docRef = ref.doc(doc.id)
              docRef.collection('Applicants').where('applicationstatus', '==', 'Rejected').get().then(sdoc => {
                let applied = null
                sdoc.forEach(ssdoc => {
                  if (ssdoc.id === id) {
                    applied = true
                  }
                  else {
                    applied = false
                  }

                  if (applied === true) {
                    let loan = new Job(doc.data().errandname, doc.data().category, doc.data().status, doc.data().client, doc.data().date.toDate(), doc.data().description, doc.data().time.toDate(), doc.data().endtime.toDate(), doc.id, doc.data().price);
                    array.push(loan);
                  }
                })
              })
            }
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
                  let loan = new Job(doc.data().errandname, doc.data().category, doc.data().status, doc.data().client, doc.data().date.toDate(), doc.data().description, doc.data().time.toDate(), doc.data().endtime.toDate(), doc.id, doc.data().price);
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


  getErrandsAccepted(id: string): Observable<any> {
    return new Observable(observer => {
      // Read collection '/JobsAccepted'
      const ref = firebase.firestore().collection('JobsAccepted')
      ref.onSnapshot(collection => {
        let array = [];
        let applied = false
        collection.forEach(doc => {
          // Add jobs into array if there's no error
          try {
            if (doc.data().time.toDate() > new Date()) {
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
                    let loan = new Job(doc.data().errandname, doc.data().category, doc.data().status, doc.data().client, doc.data().date.toDate(), doc.data().description, doc.data().time.toDate(), doc.data().endtime.toDate(), doc.id, doc.data().price);
                    array.push(loan);
                  }
                })
              })
            }
          } catch (error) { }

        });
        observer.next(array);
      });
    });
  }


  applyjobs(id: string, ER: ErrandRunner) {
    return firebase.firestore().collection('JobsAvailable').doc(id)
      .collection('Applicants').doc(ER.id).set({
        date: ER.date,
        applicationstatus: ER.applicationstatus
      })
  }

  getAllErrandsOverdue(id: string): Observable<any> {
    return new Observable(observer => {
      // Read collection '/JobsAccepted'
      const ref = firebase.firestore().collection('JobsAccepted')
      ref.onSnapshot(collection => {
        let array = [];
        let applied = false
        collection.forEach(doc => {
          // Add jobs into array if there's no error
          try {
            if (doc.data().time.toDate() <= new Date()) {
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
                    let loan = new Job(doc.data().errandname, doc.data().category, doc.data().status, doc.data().client, doc.data().date.toDate(), doc.data().description, doc.data().time.toDate(), doc.data().endtime.toDate(), doc.id, doc.data().price);
                    array.push(loan);
                  }
                })
              })
            }
          } catch (error) { }

        });
        observer.next(array);
      });
    });
  }

  getAllErrandsCompleted(id: string): Observable<any> {
    return new Observable(observer => {
      // Read collection '/JobsCompleted'
      const ref = firebase.firestore().collection('JobsCompleted')
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
                  let loan = new Job(doc.data().errandname, doc.data().category, doc.data().status, doc.data().client, doc.data().date.toDate(), doc.data().description, doc.data().time.toDate(), doc.data().endtime.toDate(), doc.id, doc.data().price);
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

  getAllErrandsExpired(id: string): Observable<any> {
    return new Observable(observer => {
      // Read collection '/JobsCompleted'
      const ref = firebase.firestore().collection('JobsAccepted')
      ref.where('status', '==', 'Expired').onSnapshot(collection => {
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
                  let loan = new Job(doc.data().errandname, doc.data().category, doc.data().status, doc.data().client, doc.data().date.toDate(), doc.data().description, doc.data().time.toDate(), doc.data().endtime.toDate(), doc.id, doc.data().price);
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

  getRejectedJobsByApplicant(client: string): Observable<any> {
    return new Observable(observer => {
      // Read collection '/JobsAvailable'
      firebase.firestore().collection('JobsAvailable').orderBy('date').onSnapshot(collection => {
        let array = [];
        collection.forEach(doc => {
          // Add job into array if there's no error
          if (doc.data().client !== client) {
            try {
              let jobdata = doc.data()
              const date = jobdata.date.toDate()
              const reportime = jobdata.time.toDate()
              const endtime = jobdata.endtime.toDate()
              const today = new Date().getDate()
              let job = new Job(jobdata.errandname, jobdata.category, jobdata.status, jobdata.client, date, jobdata.description, reportime, endtime, doc.id, jobdata.price);
              return firebase.firestore().collection('JobsAvailable').doc(doc.id).collection('Applicants').where('applicationstatus', '==', 'Rejected').get().then(collection => {
                job.applicant = [];
                collection.forEach(doc => {
                  if (doc.id === client) {
                    // const date_difference = today - date.getDate()
                    // if (date.getDate() === today || date_difference === 1) {
                      array.push(job);

                      let applicant = new ErrandRunner(doc.data().date.toDate(), doc.id, doc.data().applicationstatus, doc.data().reason, doc.data().description)
                      job.applicant.push(applicant)
                    // }
                  }
                })
              });
            } catch (error) { }
          }
          // Add loan into array if there's no error
          observer.next(array)
        });
      });
    });
  }


  getAcceptedJobsByApplicant(client: string): Observable<any> {
    return new Observable(observer => {
      // Read collection '/JobsAccepted'
      firebase.firestore().collection('JobsAccepted').orderBy('date').onSnapshot(collection => {
        let array = [];
        collection.forEach(doc => {
          // Add job into array if there's no error
          if (doc.data().client !== client) {
            try {
                let jobdata = doc.data()
                const date = jobdata.date.toDate()
                const reportime = jobdata.time.toDate()
                const endtime = jobdata.endtime.toDate()
                const today = new Date().getDate()

                let job = new Job(jobdata.errandname, jobdata.category, jobdata.status, jobdata.client, date, jobdata.description, reportime, endtime, doc.id, jobdata.price);
                //Read subcoollection '/JobsAccepted/<autoID>/Applicant'
                let dbApplicant = firebase.firestore().collection('JobsAccepted/' + doc.id + '/Applicant');
                dbApplicant.onSnapshot(applicantCollection => {
                  job.applicant = []; // Empty array
                  applicantCollection.forEach(doc => {
                    if (doc.id === client && doc.data().applicationstatus === 'Accepted') {
                      const date_difference = today - date.getDate()
                      if (date.getDate() === today || date_difference === 1) {
                        array.push(job);
  
                        let applicant = new ErrandRunner(doc.data().date.toDate(), doc.id, doc.data().applicationstatus)
                        job.applicant.push(applicant)
                      }
                    }
                  })
                });
              
            } catch (error) { }
          }
          // Add loan into array if there's no error
          observer.next(array)
        });
      });
    });
  }
 
}