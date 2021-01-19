import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonButton, IonSegment, ToastController } from '@ionic/angular';
import { Job } from '../shared/models/Job';
import { JobService } from '../shared/services/job.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-clientjobs',
  templateUrl: './clientjobs.page.html',
  styleUrls: ['./clientjobs.page.scss'],
})
export class ClientjobsPage implements OnInit {
  job: Job[];
  jobsconfirmed: Job[];
  client: string;
  filterform: FormGroup;
  orderbyfilter: string[]
  monthfilter: string[]
  orderbyselected: string;
  selectByMonth: boolean = false;
  selectByDate: boolean = false;
  nodata: boolean = false;
  nodatamonth: boolean = false;
  segmentpage: string;
  @ViewChild('monthbutton', { static: false }) monthbtn: IonButton;
  @ViewChild('datebutton', { static: false }) datebtn: IonButton;
  @ViewChild('defaultsegment', { static: false }) defaultsgmt: IonSegment;


  constructor(private userservice: UserService, private jobservice: JobService, private router: Router) {
    this.orderbyfilter = ["Closest", "Furthest"];
    this.monthfilter = ["All", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    this.filterform = new FormGroup({
      month: new FormControl(''),
      orderbydate: new FormControl('')
    })
  }

  ngOnInit() {
    this.userservice.showLoading();
    this.userservice.observeAuthState(user => {
      if (user) {
        this.client = user.email;
        this.jobservice.getAllJobsByClient(this.client)
          .subscribe(data => {
            this.job = data;
            if (!data.length) {
              this.nodata = true;
              this.monthbtn.disabled = true;
              this.datebtn.disabled = true;
            } else {
              this.nodata = false;
            }
          })
        this.defaultsgmt.value = "ClientJobsCreated"
      }
    })
  }


  clickmonth() {
    this.selectByMonth = true;
    this.selectByDate = false;
    this.monthbtn.disabled = true;
    this.datebtn.disabled = false;
    //show default data whenever change button clicked
    if (this.defaultsgmt.value === "ClientJobsCreated") {
      this.defaultData()
    }
    else if (this.defaultsgmt.value === "JobsConfirmed") {
      this.confirmData()
    }

  }
  clickdate() {
    this.selectByDate = true;
    this.selectByMonth = false;
    this.datebtn.disabled = true;
    this.monthbtn.disabled = false;
    //show default data whenever change button clicked
    if (this.defaultsgmt.value === "ClientJobsCreated") {
      this.defaultData();
    }
    else if (this.defaultsgmt.value === "JobsConfirmed") {
      this.confirmData()
    }

  }

  defaultData() {
    this.jobservice.getAllJobsByClient(this.client)
      .subscribe(data => {
        this.job = data;
      })
  }
  async onChangeMonth(value) {
    for (let i of this.monthfilter) {
      if (value === i) {
        if (this.defaultsgmt.value === "ClientJobsCreated") {
          if (value === "All") {
            this.defaultData()
            this.nodatamonth = false;
          } else {
            this.jobservice.getAllJobsByClientByMonth(this.client, i)
              .subscribe(data => {
                this.job = data;
                //handle for when there is no request data for that month
                if (!data.length) {
                  this.nodatamonth = true;
                } else {
                  this.nodatamonth = false;
                }
              })
          }
        }
        else if (this.defaultsgmt.value === "JobsConfirmed") {
          if (value === "All") {
            this.confirmData()
            this.nodatamonth = false;
          } else {
            this.jobservice.getAllJobsByClientByMonth(this.client, i, "Confirmed")
              .subscribe(data => {
                this.jobsconfirmed = data;
                //handle for when there is no request data for that month
                if (!data.length) {
                  this.nodatamonth = true;
                } else {
                  this.nodatamonth = false;
                }
              })
          }
        }
      }
    }
  }
  onChangeDate(_value) {
    // if nothing selected, show all
    this.nodata = false;
    this.nodatamonth = false;
    if (this.defaultsgmt.value === "ClientJobsCreated") {
      if (_value == "Closest") {
        this.jobservice.getAllJobsByClientByClosest(this.client)
          .subscribe(data => {
            this.job = data;
          })
      } else if (_value == "Furthest") {
        this.jobservice.getAllJobsByClientByFurthest(this.client)
          .subscribe(data => {
            this.job = data;
          })
      }
    }
    else if (this.defaultsgmt.value === "JobsConfirmed") {
      if (_value == "Closest") {
        this.jobservice.getAllJobsByClientByClosest(this.client, "Confirmed")
          .subscribe(data => {
            this.jobsconfirmed = data;
          })
      } else if (_value == "Furthest") {
        this.jobservice.getAllJobsByClientByFurthest(this.client, "Confirmed")
          .subscribe(data => {
            this.jobsconfirmed = data;
          })
      }
    }
  }

  toApplicants(id: string) {
    this.router.navigate(['clientjobsnotification', id])

  }
  defaultfilter() {
    this.defaultsgmt.value = "ClientJobsCreated"
    this.monthbtn.disabled = false;
    this.datebtn.disabled = false;
    this.selectByDate = false;
    this.selectByMonth = false;
  }
  confirmfilter() {
    this.userservice.observeAuthState(user => {
      if (user) {
        this.jobservice.getConfirmedJobsByClient(user.email)
          .subscribe(data => {
            this.jobsconfirmed = data
            if (!data.length) {
              this.nodata = true;
              this.monthbtn.disabled = true;
              this.datebtn.disabled = true;
            } else {
              this.nodata = false;
            }
          })
      }
    })
    this.defaultsgmt.value = "JobsConfirmed"
    this.monthbtn.disabled = false;
    this.datebtn.disabled = false;
    this.selectByDate = false;
    this.selectByMonth = false;
  }

  confirmData() {
    this.jobservice.getConfirmedJobsByClient(this.client)
      .subscribe(data => {
        this.jobsconfirmed = data
      })
  }

}
