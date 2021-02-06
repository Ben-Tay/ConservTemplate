export class NotSelected{

    constructor(
      public errandname: string,
      public erranddate: string, 
      public client: string,
      public applicant: string,
      public applicationstatus?: string,
      public reason?: string,
      public description?: string,
      public notification_time?: Date
      ) { }
        
  }