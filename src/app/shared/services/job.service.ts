import { Injectable } from '@angular/core';
import { Job } from '../models/Job';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { ErrandRunner } from '../models/ErrandRunner';
import { ErrandCategory } from '../models/ErrandCategory';
import { Payment } from '../models/Payment';

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
            if (doc.data().time.toDate() > new Date()) {
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
              if (doc.data().time.toDate() > new Date()) {
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
              if (doc.data().time.toDate() > new Date()) {
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
              if (doc.data().time.toDate() > new Date()) {
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
              if (doc.data().time.toDate() > new Date()) {
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
              if (doc.data().time.toDate() > new Date()) {
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
              if (doc.data().time.toDate() > new Date()) {
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
      return firebase.firestore().collection('JobsAvailable').doc(id).collection('Applicants').where('applicationstatus', '==', 'Not Selected').get().then(collection => {
        job.applicant = [];
        collection.forEach(doc => {
          let applicant = new ErrandRunner(doc.data().date.toDate(), doc.id, doc.data().applicationstatus, doc.data().reason, doc.data().description)
          job.applicant.push(applicant)
        })

        return job;
      })

    })
  }


  acceptapplicantrequest(sjob: Job, applicant: ErrandRunner) {
    let job = new Job(sjob.errandname, sjob.category, "Accepted", sjob.client, sjob.date, sjob.description, sjob.time, sjob.endtime, sjob.id, sjob.price)

    let today= new Date()
    let notification_timing = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds(), today.getMilliseconds())
    return firebase.firestore().collection('JobsAccepted').add({
      errandname: job.errandname,
      category: job.category,
      status: job.status,
      client: job.client,
      date: job.date,
      description: job.description,
      time: job.time,
      endtime: job.endtime,
      price: job.price,
      notification_time: notification_timing
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
    let today= new Date()
    let notification_timing = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds(), today.getMilliseconds())
    ref.set({
      date: applicant.date,
      applicationstatus: "Not Selected",
      reason: reason,
      description: description,
      notification_time: notification_timing
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
              if (doc.data().time.toDate() > new Date()) {
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

  getAllAvailableOverdueJobsByClient(client: string): Observable<any> {
    return new Observable(observer => {
      let array = [];
      // Read collection '/JobsAvailable'
      firebase.firestore().collection('JobsAvailable').where('client', '==', client).onSnapshot(collection => {
        collection.forEach(doc => {

          // Add job into array if there's no error
          try {
            if (doc.data().time.toDate() <= new Date()) {
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

  getAllOverdueJobsByClient(client: string): Observable<any> {
    return new Observable(observer => {
      let array = [];

      firebase.firestore().collection('JobsAccepted').where('status', '==', 'Accepted').onSnapshot(collection => {
        collection.forEach(doc => {
          // Add job into array if there's no error
          if (doc.data().client === client) {
            try {
              if (doc.data().time.toDate() <= new Date()) {
                let jobdata = doc.data()
                const date = jobdata.date.toDate()
                const reportime = jobdata.time.toDate()
                const endtime = jobdata.endtime.toDate()
                let job = new Job(jobdata.errandname, jobdata.category, jobdata.status, jobdata.client, date, jobdata.description, reportime, endtime, doc.id, jobdata.price);
                array.push(job);
                //Read subcollection '/JobsAccepted/<autoID>/Applicant'
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
      // Read collection '/JobsCompleted'
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
              //Read subcollection '/JobsAccepted/<autoID>/Applicant'
              let dbApplicant = firebase.firestore().collection('JobsCompleted/' + doc.id + '/Applicant');
              dbApplicant.onSnapshot(applicantCollection => {
                job.applicant = []; // Empty array
                applicantCollection.forEach(applicantDoc => {
                  let applier = new ErrandRunner(applicantDoc.data().date.toDate(), applicantDoc.id, applicantDoc.data().applicationstatus);
                  job.applicant.push(applier);
                });
              })
            } catch (error) { }
          }
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
              //Read subcollection '/JobsAccepted/<autoID>/Applicant'
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
          observer.next(array)
        });
      });
    });
  }

  expireJobById(sjob: Job) {
    const ref = firebase.firestore().collection('JobsAccepted').doc(sjob.id)
    return ref.update({
      status: 'Expired'
    })
  }

  changedateandtime(sjob: Job) {
    const ref = firebase.firestore().collection('JobsAvailable').doc(sjob.id)
    return ref.update({
      date: sjob.date,
      time: sjob.time,
      endtime: sjob.endtime
    })
  }

  getSpecificAcceptedJobsById(id: string, client: string): Observable<any> {
    return new Observable(observer => {
      // Read collection '/JobsAccepted'
      firebase.firestore().collection('JobsAccepted').onSnapshot(collection => {
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
              //Read subcollection '/JobsAccepted/<autoID>/Applicant'
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
          observer.next(array)
        });
      });
    });
  }

  getErrandsAppliedByClient(client: string): Observable<any> {
    return new Observable(observer => {
      // Read collection '/JobsAvailable'
      firebase.firestore().collection('JobsAvailable').orderBy('date').onSnapshot(collection => {
        let array = [];
        collection.forEach(doc => {
          // Add job into array if there's no error
          if (doc.data().client === client) {
            try {
              if (doc.data().time.toDate() > new Date()) {
                let jobdata = doc.data()
                const date = jobdata.date.toDate()
                const reportime = jobdata.time.toDate()
                const endtime = jobdata.endtime.toDate()
                let job = new Job(jobdata.errandname, jobdata.category, jobdata.status, jobdata.client, date, jobdata.description, reportime, endtime, doc.id, jobdata.price);

                //Read subcollection '/JobsAccepted/<autoID>/Applicant'
                return firebase.firestore().collection('JobsAvailable').doc(doc.id).collection('Applicants').get().then(collection => {
                  job.applicant = [];
                  collection.forEach(doc => {
                    if (doc.id !== client && doc.data().applicationstatus === 'Pending') {
                      array.push(job);
                      let applicant = new ErrandRunner(doc.data().date.toDate(), doc.id, doc.data().applicationstatus, doc.data().reason, doc.data().description)
                      job.applicant.push(applicant)
                    }
                  })
                });
              }
            } catch (error) { }
          }
          observer.next(array)
        });
      });
    });
  }
  notifyNonSelectedApplicants(applicant: string, errand: Job, reason: string, description: string) {
    const applicantref = firebase.firestore().collection('NotSelected').doc(errand.id)
    let today= new Date()
    let notification_timing = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds(), today.getMilliseconds())
    applicantref.set({
      errandname: errand.errandname,
      erranddate: errand.date,
      client: errand.client,
      applicant: applicant,
      applicationstatus: "Not Selected",
      reason: reason,
      description: description,
      notification_time: notification_timing
    })
  }

  getAcceptedJobsById(id: string) {
    //read document '/JobsAvailable/<id>'
    return firebase.firestore().collection('JobsAccepted').doc(id).get().then(doc => {
      let jobdata = doc.data()
      const date = jobdata.date.toDate()
      const reportime = jobdata.time.toDate()
      const endtime = jobdata.endtime.toDate()
      let job = new Job(jobdata.errandname, jobdata.category, jobdata.status, jobdata.client, date, jobdata.description, reportime, endtime, doc.id, jobdata.price);

      //Read subcollection '/JobsAvailable/<id>/Applicants'
      return firebase.firestore().collection('JobsAccepted').doc(id).collection('Applicant').get().then(collection => {
        job.applicant = [];
        collection.forEach(doc => {
          let applicant = new ErrandRunner(doc.data().date.toDate(), doc.id, doc.data().applicationstatus)
          job.applicant.push(applicant)
        })

        return job;
      })

    })
  }

  createnewbill(bill: Payment) {

    return firebase.firestore().collection('Bills').add({
      errandId: bill.errandId,
      errandamount: bill.billamt,
      commissionpaid: bill.commission,
      fullamount: bill.fullamt,
      paymenttype: bill.paymenttype,
      payment_status: bill.payment_status
    }).then(() => {
      return bill;
    })

  }

  changeJobsAcceptedtoJobsCompleted (sjob: Job, applicant: ErrandRunner) {
    let job = new Job(sjob.errandname, sjob.category, "Paid", sjob.client, sjob.date, sjob.description, sjob.time, sjob.endtime, sjob.id, sjob.price)

    let today= new Date()
    let notification_timing = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds(), today.getMilliseconds())
    return firebase.firestore().collection('JobsCompleted').doc(job.id).set({
      errandname: job.errandname,
      category: job.category,
      status: job.status,
      client: job.client,
      date: job.date,
      description: job.description,
      time: job.time,
      endtime: job.endtime,
      price: job.price,
      notification_time: notification_timing,
      runner: applicant.id
    }).then(doc => {
      firebase.firestore().collection('JobsCompleted/' + job.id + '/Applicant/').doc(applicant.id).set({
        date: applicant.date,
        applicationstatus: "Completed"
      })
      return job;
    })
  }

  deletefromJobsAccepted(sJob: Job) {
    const jobref = firebase.firestore().collection("JobsAccepted").doc(sJob.id);
    const jobapplicantref = firebase.firestore().collection("JobsAccepted/" + sJob.id + "/Applicant")

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
}

