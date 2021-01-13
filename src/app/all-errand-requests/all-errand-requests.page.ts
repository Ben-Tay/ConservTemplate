import { getLocaleMonthNames } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IonSearchbar } from '@ionic/angular';
import { getMonth, isSameMonth } from 'date-fns';
import { months } from 'moment';
import { Job } from '../shared/models/Job';
import { User } from '../shared/models/User';
import { JobService } from '../shared/services/job.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-all-errand-requests',
  templateUrl: './all-errand-requests.page.html',
  styleUrls: ['./all-errand-requests.page.scss'],
})
export class AllErrandRequestsPage implements OnInit {
  @ViewChild('searchBar', { static: false }) searchBar: IonSearchbar;
  FilterForms: FormGroup;

  jobs: Job[];
  allJobs: Job[];

  categories: string[];
  months;

  constructor(private jobService: JobService, private router: Router) {
    this.categories = ['All', 'Grocery', 'ElderCare', 'Babysit', 'Others']

    this.months = ['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    this.FilterForms = new FormGroup({
      category: new FormControl('All'),
      month: new FormControl('All')
    })

    this.jobService.getAllErrands()
      .subscribe(data => {
        this.jobs = data;
        this.allJobs = data;
      })
  }

  ngOnInit() {
  }

  filterItems() {
    this.searchBar.value=''
    var hey = this.allJobs
    if(this.FilterForms.value.month !== 'All' && this.FilterForms.value.category !== 'All'){
      this.jobs = hey.filter(item => {
        if (months(new Date(item.date).getMonth()).toString() && this.FilterForms.value.month.toString() && item.category && this.FilterForms.value.category) {
          return (months(new Date(item.date).getMonth()).toString().indexOf(this.FilterForms.value.month.toString()) > -1) && (item.category.toLowerCase().indexOf(this.FilterForms.value.category.toLowerCase()) > -1)
        }
      })
    }

    else if (this.FilterForms.value.month !== 'All') {
      this.jobs = hey.filter(item => {
        if (months(new Date(item.date).getMonth()).toString() && this.FilterForms.value.month.toString()) {
          return (months(new Date(item.date).getMonth()).toString().indexOf(this.FilterForms.value.month.toString()) > -1)
        }
      })
    }

    else if (this.FilterForms.value.category !== 'All') {
      this.jobs = hey.filter(item => {
        if (item.category && this.FilterForms.value.category) {
          return (item.category.toLowerCase().indexOf(this.FilterForms.value.category.toLowerCase()) > -1)
        }
      })
    }

    else {
      this.searchBar.value=''
      this.jobs = this.allJobs
    }
  }

  search(event) {
    const text = event.target.value;
    var hey = this.jobs

    if (text && text.trim() !== '') {
      this.jobs = hey.filter(
        //item => item.errandname.toLowerCase().includes(text.toLowerCase()));
        item => {
          if (item.errandname && text) {
            return (item.errandname.toLowerCase().indexOf(text.toLowerCase()) > -1)
          }
        })
    }

    else {
      // Blank text, clear the search, show all products
      this.filterItems()
    }
  }
}
