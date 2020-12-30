import { toBase64String } from '@angular/compiler/src/output/source_map';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../shared/models/User';
import { UserService } from '../shared/services/user.service';
import 'firebase/firestore';
import 'firebase/storage';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  SignupForm: FormGroup;
  gender: string[];
  data: User;
  signupError: string;

  constructor(private userService: UserService, private router: Router) {
    this.SignupForm = new FormGroup({
      name: new FormControl(''),
      gender: new FormControl(''),
      birthday: new FormControl(''),
      address: new FormControl(''),
      phoneno: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      confirmpassword: new FormControl('')
    })

    this.gender = ["Male", "Female"]
  }

  ngOnInit() {
  }

  register(){
    var formvalue = this.SignupForm.value
    this.data = new User(formvalue.name, formvalue.gender, formvalue.birthday, formvalue.email, formvalue.password, formvalue.phoneno, formvalue.address)
    this.userService.signupContinue(this.data.email, this.data.password)
    
  }

}
