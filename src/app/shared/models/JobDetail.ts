import { Time } from "@angular/common";


export class JobDetail {

    constructor(
      public title: string,
      public date: Date,
      public description: string,
      public time: Time
      ) { }
  
  }