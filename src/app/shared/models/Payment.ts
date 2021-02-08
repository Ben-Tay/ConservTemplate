export class Payment{

    constructor(
      public errandId: string,
      public billamt: number,
      public commission: number,
      public fullamt: number,
      public paymenttype: string,
      public payment_status: string
      ) { }
        
  }