export class ErrandRunner{

    constructor(
      public date: Date,
      public id?: string,
      public applicationstatus?: string,
      public reason?: string,
      public description?: string,
      public notification_time?: Date
      ) { }
  
  }