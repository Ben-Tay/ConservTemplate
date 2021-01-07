import { Time } from "@angular/common";

export class Job {
    constructor(
        public errandname: string,
        public category: string,
        public status: string,
        public client: string,
        public date: Date,
        public description: string,
        public time: Time,
        public price?: number,
        public id?: string
    ) { }

}