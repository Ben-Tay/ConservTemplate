import { Injectable } from '@angular/core';
import { Job } from '../models/Job';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { Time } from '@angular/common';
import { ErrandRunner } from '../models/ErrandRunner';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor() { }

  createnewjobrequest(errandname: string, category: string,
    client: string, date: Date, description: string, time: Time) {

    let job = new Job(errandname, category, 'Available', client, date, description, time)

    return firebase.firestore().collection('JobsAvailable').add({
      errandname: job.errandname,
      category: job.category,
      status: job.status,
      client: job.client,
      date: job.date,
      description: job.description,
      time: job.time
    }).then(() => {
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
            const date = jobdata.date.toDate()
            let job = new Job(jobdata.errandname, jobdata.category, jobdata.status, jobdata.client,
              date, jobdata.description, jobdata.time, doc.id);
            array.push(job);
          } catch (error) { }

        });
        observer.next(array);
      });
    });
  }

  getAllJobsByClientByMonth(client: string, month: string, confirm?: string): Observable<any> {
    return new Observable(observer => {
      if (confirm) {
        // Read collection '/JobsAccepted'
        firebase.firestore().collection('JobsAccepted').where('client', '==', client).onSnapshot(collection => {
          let array = [];
          collection.forEach(doc => {

            // Add job into array if there's no error
            try {
              let jobdata = doc.data()
              const date = jobdata.date.toDate()
              const filtermonth = date.toLocaleString('default', { month: 'short' })
              if (filtermonth === month) {
                let job = new Job(jobdata.errandname, jobdata.category, jobdata.status, jobdata.client,
                  date, jobdata.description, jobdata.time, doc.id);

                array.push(job);

                let dbApplicant = firebase.firestore().collection('JobsAccepted/' + doc.id + '/Applicant');
                dbApplicant.onSnapshot(applicantCollection => {
                  job.applicant = []; // Empty array
                  applicantCollection.forEach(applicantDoc => {
                    let applier = new ErrandRunner(applicantDoc.data().date.toDate(), applicantDoc.id);
                    job.applicant.push(applier);
                  });
                });
              }
            } catch (error) { }
          });
          observer.next(array);
        });
      }
      else {
        // Read collection '/JobsAvailable'
        firebase.firestore().collection('JobsAvailable').where('client', '==', client).onSnapshot(collection => {
          let array = [];
          collection.forEach(doc => {

            // Add job into array if there's no error
            try {
              let jobdata = doc.data()
              const date = jobdata.date.toDate()
              const filtermonth = date.toLocaleString('default', { month: 'short' })
              if (filtermonth === month) {
                let job = new Job(jobdata.errandname, jobdata.category, jobdata.status, jobdata.client,
                  date, jobdata.description, jobdata.time, doc.id);

                array.push(job);
              }
            } catch (error) { }

          });
          observer.next(array);
        });
      }

    });
  }

  getAllJobsByClientByClosest(client: string, confirm?: string): Observable<any> {
    return new Observable(observer => {
      if (confirm) {
        // Read collection '/JobsAccepted'
        firebase.firestore().collection('JobsAccepted').where('client', '==', client).orderBy('date').onSnapshot(collection => {
          let array = [];
          collection.forEach(doc => {

            // Add job into array if there's no error
            try {
              let jobdata = doc.data()
              const date = jobdata.date.toDate()
              let job = new Job(jobdata.errandname, jobdata.category, jobdata.status, jobdata.client,
                date, jobdata.description, jobdata.time, doc.id);
              array.push(job);

              let dbApplicant = firebase.firestore().collection('JobsAccepted/' + doc.id + '/Applicant');
              dbApplicant.onSnapshot(applicantCollection => {
                job.applicant = []; // Empty array
                applicantCollection.forEach(applicantDoc => {
                  let applier = new ErrandRunner(applicantDoc.data().date.toDate(), applicantDoc.id);
                  job.applicant.push(applier);
                });
              });

            } catch (error) { }

          });
          observer.next(array);
        })
      } else {
        // Read collection '/JobsAvailable'
        firebase.firestore().collection('JobsAvailable').where('client', '==', client).orderBy('date').onSnapshot(collection => {
          let array = [];
          collection.forEach(doc => {

            // Add job into array if there's no error
            try {
              let jobdata = doc.data()
              const date = jobdata.date.toDate()
              let job = new Job(jobdata.errandname, jobdata.category, jobdata.status, jobdata.client,
                date, jobdata.description, jobdata.time, doc.id);
              array.push(job);

            } catch (error) { }

          });
          observer.next(array);
        });

      }
    })
  }

  getAllJobsByClientByFurthest(client: string, confirm?: string): Observable<any> {
    return new Observable(observer => {
      if (confirm) {
        // Read collection '/JobsAccepted'
        firebase.firestore().collection('JobsAccepted').where('client', '==', client).orderBy('date', 'desc').onSnapshot(collection => {
          let array = [];
          collection.forEach(doc => {

            // Add job into array if there's no error
            try {
              let jobdata = doc.data()
              const date = jobdata.date.toDate()
              let job = new Job(jobdata.errandname, jobdata.category, jobdata.status, jobdata.client,
                date, jobdata.description, jobdata.time, doc.id);
              array.push(job);

            } catch (error) { }

          });
          observer.next(array);
        })
      }
      else {
        // Read collection '/JobsAvailable'
        firebase.firestore().collection('JobsAvailable').where('client', '==', client).orderBy('date', 'desc').onSnapshot(collection => {
          let array = [];
          collection.forEach(doc => {

            // Add job into array if there's no error
            try {
              let jobdata = doc.data()
              const date = jobdata.date.toDate()
              let job = new Job(jobdata.errandname, jobdata.category, jobdata.status, jobdata.client,
                date, jobdata.description, jobdata.time, doc.id);
              array.push(job);

              let dbApplicant = firebase.firestore().collection('JobsAccepted/' + doc.id + '/Applicant');
              dbApplicant.onSnapshot(applicantCollection => {
                job.applicant = []; // Empty array
                applicantCollection.forEach(applicantDoc => {
                  let applier = new ErrandRunner(applicantDoc.data().date.toDate(), applicantDoc.id);
                  job.applicant.push(applier);
                });
              });
            } catch (error) { }

          });
          observer.next(array);
        })
      }
    })
  }

  getSpecificJobsById(id: string) {
    //read document '/JobsAvailable/<id>'
    return firebase.firestore().collection('JobsAvailable').doc(id).get().then(doc => {
      let jobdata = doc.data()
      const date = jobdata.date.toDate()
      let job = new Job(jobdata.errandname, jobdata.category, jobdata.status, jobdata.client,
        date, jobdata.description, jobdata.time, doc.id);

      //Read subcollection '/JobsAvailable/<id>/Applicants'
      return firebase.firestore().collection('JobsAvailable').doc(id).collection('Applicants').get().then(collection => {
        job.applicant = [];
        collection.forEach(doc => {
          let applicant = new ErrandRunner(doc.data().date.toDate(), doc.id)
          job.applicant.push(applicant)
        })

        return job;
      })

    })
  }
  getAllErrands(): Observable<any> {
    return new Observable(observer => {
      // Read collection '/JobsAvailable'
      firebase.firestore().collection('JobsAvailable').onSnapshot(collection => {
        let array = [];
        collection.forEach(doc => {

          // Add jobs into array if there's no error
          try {
            let loan = new Job(doc.data().errandname, doc.data().category, doc.data().status, doc.data().client, doc.data().date.toDate(), doc.data().description, doc.data().time, doc.id);
            array.push(loan);

          } catch (error) { }

        });
        observer.next(array);
      });
    });
  }

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
            docRef.collection('Applicants').get().then(sdoc => {
              let applied = null
              docRef.collection('Applicants').doc(id).get().then((docSnapshot)=>{
                if(docSnapshot.exists){
                  return;
                }
                else{
                  let loan = new Job(doc.data().errandname, doc.data().category, doc.data().status, doc.data().client, doc.data().date.toDate(), doc.data().description, doc.data().time, doc.id);
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

  applyjobs(id: string, email: string, dateapplied: Date) {
    return firebase.firestore().collection('JobsAvailable').doc(id).collection('Applicants').get().then(collection => {
      let y = false

      collection.forEach(doc => {
        if (doc.id == email) {
          y = true
        }
      })

      if (y == false) {
        firebase.firestore().collection('JobsAvailable').doc(id)
          .collection('Applicants').doc(email).set({
            date: dateapplied
          })
      }
      return y
    })
  }

  acceptapplicantrequest(sjob: Job, applicant: ErrandRunner) {
    let job = new Job(sjob.errandname, sjob.category, "Accepted", sjob.client, sjob.date, sjob.description, sjob.time)

    return firebase.firestore().collection('JobsAccepted').add({
      errandname: job.errandname,
      category: job.category,
      status: job.status,
      client: job.client,
      date: job.date,
      description: job.description,
      time: job.time
    }).then(doc => {
      job.id = doc.id;
      firebase.firestore().collection('JobsAccepted/' + doc.id + '/Applicant/').doc(applicant.id).set({
        date: applicant.date,
        applicationstatus: "Accepted"
      })
      return job;
    })
  }
  
  rejectapplicantbyspecificjob(jobid: string, applicant: ErrandRunner) {
    const jobref = firebase.firestore().collection("JobsAvailable").doc(jobid);
    const ref = firebase.firestore().collection('JobsAvailable/' + jobid + '/Applicants/').doc(applicant.id)
    ref.set({
      date: applicant.date,
      applicationstatus: "Rejected"
    }).then(() => {
      ref.get().then(doc => {
        if(doc.exists){
          ref.delete()
        }
      })
    })

  }

  deletefromJobsAvailable(sJob: Job) {
    const jobref = firebase.firestore().collection("JobsAvailable").doc(sJob.id);
    const jobapplicantref = firebase.firestore().collection("JobsAvailable/" + sJob.id + "/Applicants")

    //delete applicant subcollection of particular job document
    jobapplicantref.get().then(snapshot => {
      if (snapshot.empty) {
      } else {
        snapshot.forEach(doc => {
          const applicantrefid = jobapplicantref.doc(doc.id)
          applicantrefid.get().then(doc => {
            if (doc.exists)
              applicantrefid.delete()
          })
        })
      }
    })
    //delete particular jobdocument
    jobref.get().then(doc => {
      if (doc.exists) {
        jobref.delete();
      }
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
            docRef.collection('Applicants').get().then(sdoc => {
              let applied = null
              sdoc.forEach(ssdoc => {
                if (ssdoc.id === id) {
                  applied = true
                }
                else{
                  applied = false
                }

                if (applied === true) {
                  let loan = new Job(doc.data().errandname, doc.data().category, doc.data().status, doc.data().client, doc.data().date.toDate(), doc.data().description, doc.data().time, doc.id);
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
                  let loan = new Job(doc.data().errandname, doc.data().category, doc.data().status, doc.data().client, doc.data().date.toDate(), doc.data().description, doc.data().time, doc.id);
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

  getConfirmedJobsByClient(client: string): Observable<any> {
    return new Observable(observer => {
      // Read collection '/JobsAccepted'
      firebase.firestore().collection('JobsAccepted').orderBy('date').onSnapshot(collection => {
        let array = [];
        collection.forEach(doc => {
          // Add job into array if there's no error
          if (doc.data().client === client) {
            try {
              let jobdata = doc.data()
              const date = jobdata.date.toDate()
              let job = new Job(jobdata.errandname, jobdata.category, jobdata.status, jobdata.client,
                date, jobdata.description, jobdata.time, doc.id);
              array.push(job);
              //Read subcoollection '/JobsAccepted/<autoID>/Applicant'
              let dbApplicant = firebase.firestore().collection('JobsAccepted/' + doc.id + '/Applicant');
              dbApplicant.onSnapshot(applicantCollection => {
                job.applicant = []; // Empty array
                applicantCollection.forEach(applicantDoc => {
                  let applier = new ErrandRunner(applicantDoc.data().date.toDate(), applicantDoc.id);
                  job.applicant.push(applier);
                });
              });
            } catch (error) { }
          }
          // Add loan into array if there's no error
        });
        observer.next(array);
      });
    });
  }
}