import { Time } from "@angular/common";
import { IonDatetime } from "@ionic/angular";
import { Duration } from "moment";
import { Timestamp } from "rxjs";

export class JobDetail {

    constructor(
      public title: string,
      public date: Date,
      public description: string,
      public time: Time
      ) { }
  
  }