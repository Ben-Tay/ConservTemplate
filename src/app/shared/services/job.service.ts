import { Injectable } from '@angular/core';
import { Job } from '../models/Job';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { Time } from '@angular/common';
import { ErrandRunner } from '../models/ErrandRunner';
import { ErrandCategory } from '../models/ErrandCategory';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private pricesRef = firebase.firestore().collection("price")

  constructor() { }

  createnewjobrequest(errandname: string, category: string, client: string, date: Date, description: string, time: Date, end_time: Date, pricing: number) {

    let job = new Job(errandname, category, 'Available', client, date, description, time, end_time)

    return firebase.firestore().collection('JobsAvailable').add({
      errandname: job.errandname,
      category: job.category,
      status: job.status,
      client: job.client,
      date: job.date,
      description: job.description,
      time: job.time,
      endtime: job.endtime,
      price: pricing
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
            if (doc.data().date.toDate() >= new Date()) {
              let jobdata = doc.data()
              const date = jobdata.date.toDate()
              const reportime = jobdata.time.toDate()
              const endtime = jobdata.endtime.toDate()
              let job = new Job(jobdata.errandname, jobdata.category, jobdata.status, jobdata.client, date, jobdata.description, reportime, endtime, doc.id, jobdata.price);
              array.push(job);
            }
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
              if (doc.data().date.toDate() >= new Date()) {
                let jobdata = doc.data()
                const date = jobdata.date.toDate()
                const reportime = jobdata.time.toDate()
                const endtime = jobdata.endtime.toDate()
                const filtermonth = date.toLocaleString('default', { month: 'short' })
                if (filtermonth === month) {
                  let job = new Job(jobdata.errandname, jobdata.category, jobdata.status, jobdata.client, date, jobdata.description, reportime, endtime, doc.id, jobdata.price);

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
              if (doc.data().date.toDate() >= new Date()) {
                let jobdata = doc.data()
                const date = jobdata.date.toDate()
                const reportime = jobdata.time.toDate()
                const endtime = jobdata.endtime.toDate()
                const filtermonth = date.toLocaleString('default', { month: 'short' })
                if (filtermonth === month) {
                  let job = new Job(jobdata.errandname, jobdata.category, jobdata.status, jobdata.client, date, jobdata.description, reportime, endtime, doc.id, jobdata.price);

                  array.push(job);
                }
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
              if (doc.data().date.toDate() >= new Date()) {
                let jobdata = doc.data()
                const date = jobdata.date.toDate()
                const reportime = jobdata.time.toDate()
                const endtime = jobdata.endtime.toDate()
                let job = new Job(jobdata.errandname, jobdata.category, jobdata.status, jobdata.client, date, jobdata.description, reportime, endtime, doc.id, jobdata.price);
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
        })
      } else {
        // Read collection '/JobsAvailable'
        firebase.firestore().collection('JobsAvailable').where('client', '==', client).orderBy('date').onSnapshot(collection => {
          let array = [];
          collection.forEach(doc => {

            // Add job into array if there's no error
            try {
              if (doc.data().date.toDate() >= new Date()) {
                let jobdata = doc.data()
                const date = jobdata.date.toDate()
                const reportime = jobdata.time.toDate()
                const endtime = jobdata.endtime.toDate()
                let job = new Job(jobdata.errandname, jobdata.category, jobdata.status, jobdata.client, date, jobdata.description, reportime, endtime, doc.id, jobdata.price);
                array.push(job);
              }
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
              if (doc.data().date.toDate() >= new Date()) {
                let jobdata = doc.data()
                const date = jobdata.date.toDate()
                const reportime = jobdata.time.toDate()
                const endtime = jobdata.endtime.toDate()
                let job = new Job(jobdata.errandname, jobdata.category, jobdata.status, jobdata.client, date, jobdata.description, reportime, endtime, doc.id, jobdata.price);
                array.push(job);
              }
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
              if (doc.data().date.toDate() >= new Date()) {
                let jobdata = doc.data()
                const date = jobdata.date.toDate()
                const reportime = jobdata.time.toDate()
                const endtime = jobdata.endtime.toDate()
                let job = new Job(jobdata.errandname, jobdata.category, jobdata.status, jobdata.client, date, jobdata.description, reportime, endtime, doc.id, jobdata.price);
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
        })
      }
    })
  }

  getSpecificJobsById(id: string) {
    //read document '/JobsAvailable/<id>'
    return firebase.firestore().collection('JobsAvailable').doc(id).get().then(doc => {
      let jobdata = doc.data()
      const date = jobdata.date.toDate()
      const reportime = jobdata.time.toDate()
      const endtime = jobdata.endtime.toDate()
      let job = new Job(jobdata.errandname, jobdata.category, jobdata.status, jobdata.client, date, jobdata.description, reportime, endtime, doc.id, jobdata.price);

      //Read subcollection '/JobsAvailable/<id>/Applicants'
      return firebase.firestore().collection('JobsAvailable').doc(id).collection('Applicants').where('applicationstatus', '==', 'Pending').get().then(collection => {
        job.applicant = [];
        collection.forEach(doc => {
          let applicant = new ErrandRunner(doc.data().date.toDate(), doc.id, doc.data().applicationstatus)
          job.applicant.push(applicant)
        })

        return job;
      })

    })
  }

  getRejectedApplicantsById(id: string) {
    //read document '/JobsAvailable/<id>'
    return firebase.firestore().collection('JobsAvailable').doc(id).get().then(doc => {
      let jobdata = doc.data()
      const date = jobdata.date.toDate()
      const reportime = jobdata.time.toDate()
      const endtime = jobdata.endtime.toDate()
      let job = new Job(jobdata.errandname, jobdata.category, jobdata.status, jobdata.client, date, jobdata.description, reportime, endtime, doc.id, jobdata.price);

      //Read subcollection '/JobsAvailable/<id>/Applicants'
      return firebase.firestore().collection('JobsAvailable').doc(id).collection('Applicants').where('applicationstatus', '==', 'Rejected').get().then(collection => {
        job.applicant = [];
        collection.forEach(doc => {
          let applicant = new ErrandRunner(doc.data().date.toDate(), doc.id, doc.data().applicationstatus)
          job.applicant.push(applicant)
        })

        return job;
      })

    })

  }

  acceptapplicantrequest(sjob: Job, applicant: ErrandRunner) {
    let job = new Job(sjob.errandname, sjob.category, "Accepted", sjob.client, sjob.date, sjob.description, sjob.time, sjob.endtime, sjob.id, sjob.price)

    return firebase.firestore().collection('JobsAccepted').add({
      errandname: job.errandname,
      category: job.category,
      status: job.status,
      client: job.client,
      date: job.date,
      description: job.description,
      time: job.time,
      endtime: job.endtime,
      price: job.price
    }).then(doc => {
      job.id = doc.id;
      firebase.firestore().collection('JobsAccepted/' + doc.id + '/Applicant/').doc(applicant.id).set({
        date: applicant.date,
        applicationstatus: "Accepted"
      })
      return job;
    })
  }

  rejectapplicantbyspecificjob(jobid: string, applicant: ErrandRunner, reason: string, description: string) {
    const ref = firebase.firestore().collection('JobsAvailable/' + jobid + '/Applicants/').doc(applicant.id)
    ref.set({
      date: applicant.date,
      applicationstatus: "Rejected",
      reason: reason,
      description: description
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

  getConfirmedJobsByClient(client: string): Observable<any> {
    return new Observable(observer => {
      // Read collection '/JobsAccepted'
      firebase.firestore().collection('JobsAccepted').orderBy('date').onSnapshot(collection => {
        let array = [];
        collection.forEach(doc => {
          // Add job into array if there's no error
          if (doc.data().client === client) {
            try {
              if (doc.data().date.toDate() >= new Date()) {
                let jobdata = doc.data()
                const date = jobdata.date.toDate()
                const reportime = jobdata.time.toDate()
                const endtime = jobdata.endtime.toDate()
                let job = new Job(jobdata.errandname, jobdata.category, jobdata.status, jobdata.client, date, jobdata.description, reportime, endtime, doc.id, jobdata.price);
                array.push(job);
                //Read subcoollection '/JobsAccepted/<autoID>/Applicant'
                let dbApplicant = firebase.firestore().collection('JobsAccepted/' + doc.id + '/Applicant');
                dbApplicant.onSnapshot(applicantCollection => {
                  job.applicant = []; // Empty array
                  applicantCollection.forEach(applicantDoc => {
                    let applier = new ErrandRunner(applicantDoc.data().date.toDate(), applicantDoc.id, applicantDoc.data().applicationstatus);
                    job.applicant.push(applier);
                  });
                });
              }
            } catch (error) { }
          }
          // Add loan into array if there's no error
          observer.next(array)
        });
      });
    });
  }

  getErrandPricesByCategory(category: string): Observable<any> {
    return new Observable(observer => {
      //Read collection 'price'
      this.pricesRef.onSnapshot(collection => {
        let array = [];
        collection.forEach(doc => {
          if (doc.id === category)
            try {
              let errandprice = new ErrandCategory(doc.data().price, doc.id)
              array.push(errandprice);
            } catch (error) { }
        });
        observer.next(array);
      })
    })
  }

  getAllOverdueJobsByClient(client: string): Observable<any> {
    return new Observable(observer => {
      let array = [];
      // Read collection '/JobsAvailable'
      firebase.firestore().collection('JobsAvailable').where('client', '==', client).onSnapshot(collection => {
        collection.forEach(doc => {

          // Add job into array if there's no error
          try {
            if (doc.data().date.toDate() < new Date()) {
              let jobdata = doc.data()
              const date = jobdata.date.toDate()
              const reportime = jobdata.time.toDate()
              const endtime = jobdata.endtime.toDate()
              let job = new Job(jobdata.errandname, jobdata.category, jobdata.status, jobdata.client, date, jobdata.description, reportime, endtime, doc.id, jobdata.price);
              array.push(job);
            }
          } catch (error) { }

        });
      });

      firebase.firestore().collection('JobsAccepted').where('status', '==', 'Accepted').onSnapshot(collection => {
        collection.forEach(doc => {
          // Add job into array if there's no error
          if (doc.data().client === client) {
            try {
              if (doc.data().date.toDate() < new Date()) {
                let jobdata = doc.data()
                const date = jobdata.date.toDate()
                const reportime = jobdata.time.toDate()
                const endtime = jobdata.endtime.toDate()
                let job = new Job(jobdata.errandname, jobdata.category, jobdata.status, jobdata.client, date, jobdata.description, reportime, endtime, doc.id, jobdata.price);
                array.push(job);
                //Read subcoollection '/JobsAccepted/<autoID>/Applicant'
                let dbApplicant = firebase.firestore().collection('JobsAccepted/' + doc.id + '/Applicant');
                dbApplicant.onSnapshot(applicantCollection => {
                  job.applicant = []; // Empty array
                  applicantCollection.forEach(applicantDoc => {
                    let applier = new ErrandRunner(applicantDoc.data().date.toDate(), applicantDoc.id, applicantDoc.data().applicationstatus);
                    job.applicant.push(applier);
                  });
                });
              }
            } catch (error) { }
          }
        });

        observer.next(array);
      });
    });
  }

  getCompletedJobsByClient(client: string): Observable<any> {
    return new Observable(observer => {
      // Read collection '/JobsAccepted'
      firebase.firestore().collection('JobsCompleted').orderBy('date').onSnapshot(collection => {
        let array = [];
        collection.forEach(doc => {
          // Add job into array if there's no error
          if (doc.data().client === client) {
            try {
                let jobdata = doc.data()
                const date = jobdata.date.toDate()
                const reportime = jobdata.time.toDate()
                const endtime = jobdata.endtime.toDate()
                let job = new Job(jobdata.errandname, jobdata.category, jobdata.status, jobdata.client, date, jobdata.description, reportime, endtime, doc.id, jobdata.price);
                array.push(job);
                //Read subcoollection '/JobsAccepted/<autoID>/Applicant'
                let dbApplicant = firebase.firestore().collection('JobsCompleted/' + doc.id + '/Applicant');
                dbApplicant.onSnapshot(applicantCollection => {
                  job.applicant = []; // Empty array
                  applicantCollection.forEach(applicantDoc => {
                    let applier = new ErrandRunner(applicantDoc.data().date.toDate(), applicantDoc.id, applicantDoc.data().applicationstatus);
                    job.applicant.push(applier);
                  });
                });
            } catch (error) { }
          }
          // Add loan into array if there's no error
          observer.next(array)
        });
      });
    });
  }

  getExpiredJobsByClient(client: string): Observable<any> {
    return new Observable(observer => {
      // Read collection '/JobsAccepted'
      firebase.firestore().collection('JobsAccepted').where('status', '==', 'Expired').onSnapshot(collection => {
        let array = [];
        collection.forEach(doc => {
          // Add job into array if there's no error
          if (doc.data().client === client) {
            try {
                let jobdata = doc.data()
                const date = jobdata.date.toDate()
                const reportime = jobdata.time.toDate()
                const endtime = jobdata.endtime.toDate()
                let job = new Job(jobdata.errandname, jobdata.category, jobdata.status, jobdata.client, date, jobdata.description, reportime, endtime, doc.id, jobdata.price);
                array.push(job);
                //Read subcoollection '/JobsAccepted/<autoID>/Applicant'
                let dbApplicant = firebase.firestore().collection('JobsAccepted/' + doc.id + '/Applicant');
                dbApplicant.onSnapshot(applicantCollection => {
                  job.applicant = []; // Empty array
                  applicantCollection.forEach(applicantDoc => {
                    let applier = new ErrandRunner(applicantDoc.data().date.toDate(), applicantDoc.id, applicantDoc.data().applicationstatus);
                    job.applicant.push(applier);
                  });
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
  // getErrandCategoryPrices(): Observable<any> {
  //   return new Observable(observer => {
  //     //Read collection '/price'
  //     firebase.firestore().collection('JobsAvailable').onSnapshot(collection => {
  //       let array = [];
  //       collection.forEach(doc => {
  //         //Add job into array if theres no error
  //         try {
  //           let jobdata = doc.data()
  //           const date = jobdata.date.toDate()
  //           this.pricesRef.get().then(snapshot => {
  //             if (snapshot.empty) {
  //             } else {
  //               snapshot.forEach(doc => {
  //                 if (doc.id === jobdata.category) {
  //                   let job = new Job(jobdata.errandname, jobdata.category, jobdata.status, jobdata.client, date, jobdata.description, jobdata.time, doc.id, doc.data().price);
  //                   array.push(job);
  //                   observer.next(array)
  //                 }
  //               })
  //             }
  //           })
  //         } catch (error) { }
  //       })
  //     });
  //   });
  // }

