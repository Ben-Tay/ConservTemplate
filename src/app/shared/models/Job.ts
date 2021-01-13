import { Time } from "@angular/common";

export class Job {
    appliedErrandRunner: [];

    constructor(
        public errandname: string,
        public category: string,
        public status: string,
        public client: string,
        public date: Date,
        public description: string,
        public time: Time,
        public id?: string,
        public errandrunner?: string,
        public price?: number
    ) { }

}