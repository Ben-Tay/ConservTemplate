import { JobDetail } from "./JobDetail";

export class Job {
    details: JobDetail[] =[];
    constructor(
        public errandname:string,
        public category: string,
        public status: string,
        public client: string,
        public price?: number,
        public id?: string
    ){ }

}