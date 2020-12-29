export class User {
    imagepath: string;

    constructor(
        public name:string,
        public image: string,
        public email: string,
        public phoneno: number,
        public address: string
    ){ }

}