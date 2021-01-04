import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IonSearchbar } from '@ionic/angular';
import { Job } from '../shared/models/Job';
import { JobDetail } from '../shared/models/JobDetail';
import { JobService } from '../shared/services/job.service';

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
  months: string[];

  constructor(private jobService: JobService) {
    this.categories = ['All', 'Grocery', 'ElderCare', 'Babysit', 'Others']
    this.months = []
    this.FilterForms = new FormGroup({
      category: new FormControl('All'),
      month: new FormControl('')
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
    if (this.FilterForms.value.category !== 'All') {
      this.jobs = this.allJobs.filter(item => {
        if (item.category && this.FilterForms.value.category) {
          return (item.category.toLowerCase().indexOf(this.FilterForms.value.category.toLowerCase()) > -1)
        }
      })
    }
    else {
      this.jobService.getAllErrands()
        .subscribe(data => {
          this.jobs = data
        })
    }
  }

  search(event) {
    const text = event.target.value;
    var allProducts: Job[]
    allProducts = this.jobs

    if (text && text.trim() !== '') {
      this.jobs = allProducts.filter(
        //item => item.errandname.toLowerCase().includes(text.toLowerCase()));
        item => {
          if (item.errandname && text) {
            return (item.errandname.toLowerCase().indexOf(text.toLowerCase()) > -1)
          }
        })
    }

    else {
      // Blank text, clear the search, show all products
      this.jobService.getAllErrands()
        .subscribe(data => {
          this.jobs = data
        })
    }
  }

}
