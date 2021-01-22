import { Time } from "@angular/common";
import { ErrandRunner } from "./ErrandRunner";

export class Job {
    applicant: ErrandRunner[] = []

    constructor(
        public errandname: string,
        public category: string,
        public status: string,
        public client: string,
        public date: Date,
        public description: string,
        public time: Time,
        public id?: string,
        public price?: number
    ) { }

}