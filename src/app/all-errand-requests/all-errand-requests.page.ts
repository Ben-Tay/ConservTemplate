import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IonSearchbar, MenuController } from '@ionic/angular';
import { months } from 'moment';
import { Job } from '../shared/models/Job';
import { NotSelected } from '../shared/models/NotSelected';
import { JobERService } from '../shared/services/job-er.service';
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
  jobsRejectedCount: Job[];
  jobsAcceptedCount: Job[];
  unselected: NotSelected[];

  constructor(private jobService: JobERService, private userService: UserService, private menuController: MenuController) {
    this.categories = ['All', 'Grocery', 'ElderCare', 'Babysit', 'DogWalking', 'Delivery']

    this.months = ['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    this.FilterForms = new FormGroup({
      category: new FormControl('All'),
      month: new FormControl('All')
    })
    this.userService.observeAuthState(async user=>{
      this.jobService.getAllErrandsExcept(await user.email)
      .subscribe(async data => {
        this.jobs = await data;
        this.allJobs = await data;
      })
      this.jobService.getRejectedJobsByApplicant(await user.email)
      .subscribe(data=>{
        if(data){
          this.jobsRejectedCount =  data
        }
      })
      this.jobService.getAcceptedJobsByApplicant(await user.email)
      .subscribe(data => {
        this.jobsAcceptedCount = data;
      })
      this.jobService.getNonSelectedDetails(await user.email)
      .subscribe(data => {
        this.unselected = data;
      })
    })
    this.ionViewWillEnter()
  }

  ngOnInit() {
    this.userService.showLoading();
  }

  ionViewWillEnter(){
    this.menuController.enable(true, 'second')
  }

  ionViewDidEnter() {
    this.userService.showLoading()
    this.userService.observeAuthState(async user=>{
      this.jobService.getAllErrandsExcept(await user.email)
      .subscribe(async data => {
        this.jobs = await data;
        this.allJobs = await data;
      })
    })
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
