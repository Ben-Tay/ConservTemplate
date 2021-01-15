import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonButton } from '@ionic/angular';
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
  client: string;
  filterform: FormGroup;
  orderbyfilter: string[]
  monthfilter: string[]
  orderbyselected: string;
  selectByMonth: boolean = false;
  selectByDate: boolean = false;
  nodata: boolean = false;
  nodatamonth: boolean = false;
  @ViewChild('monthbutton', { static: false }) monthbtn: IonButton;
  @ViewChild('datebutton', { static: false }) datebtn: IonButton;






  constructor(private userservice: UserService, private jobservice: JobService, private router: Router) {
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
      }
    })
    this.orderbyfilter = ["Closest", "Furthest"];
    this.monthfilter = ["All", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    this.filterform = new FormGroup({
      month: new FormControl(''),
      orderbydate: new FormControl('')
    })
  }

  ngOnInit() {
    this.userservice.showLoading();

  }

  clickmonth() {
    this.selectByMonth = true;
    this.selectByDate = false;
    this.monthbtn.disabled = true;
    this.datebtn.disabled = false;
    //show default data whenever change button clicked
    this.defaultData()
  }
  clickdate() {
    this.selectByDate = true;
    this.selectByMonth = false;
    this.datebtn.disabled = true;
    this.monthbtn.disabled = false;
    //show default data whenever change button clicked
    this.defaultData();

  }

  defaultData() {
    this.jobservice.getAllJobsByClient(this.client)
      .subscribe(data => {
        this.job = data;
      })
  }
  onChangeMonth(value) {
    for (let i of this.monthfilter) {
      if (value === i) {
        if (value === "All") {
          this.defaultData()
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
    }
  }
  onChangeDate(_value) {
    // if nothing selected, show all
    this.nodata = false;
    this.nodatamonth = false;
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

  toApplicants(id: string) {
    this.router.navigate(['clientjobsnotification', id])

  }
}
