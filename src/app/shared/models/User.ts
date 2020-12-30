export class User {
    imagepath: string;

    constructor(
        public name:string,
        public gender: string,
        public birthday: Date,
        public email: string,
        public password: string,
        public phoneno: string,
        public address: string
    ){ }

}