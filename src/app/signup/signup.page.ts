import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../shared/models/User';
import { UserService } from '../shared/services/user.service';


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
      name: new FormControl('', [Validators.required]),

      gender: new FormControl('', [Validators.required]),

      birthday: new FormControl('', [Validators.required]),
      
      address: new FormControl('', [Validators.required]),
      
      phoneno: new FormControl(''),
      
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      
      password: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      
      confirmpassword: new FormControl('')
    })

    this.gender = ["Male", "Female"]
  }

  ngOnInit() {
  }

  register(){
    var formvalue = this.SignupForm.value
    this.data = new User(formvalue.name, formvalue.gender, formvalue.birthday, formvalue.email, formvalue.password, formvalue.phoneno, formvalue.address)
    this.userService.signup(this.data).then(user=>{
      this.userService.signupContinue(this.data);
      this.router.navigate(['/home']);
    })
  };

  validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'gender': [
      { type: 'required', message: 'Gender is required'}
    ],
    'birthday': [
      { type: 'required', message: 'Birthday is required'}
    ],
    'address': [
      { type: 'required', message: 'Address is required'}
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'phone': [
      { type: 'required', message: 'Phone is required.' },
      { type: 'validCountryPhone', message: 'The phone is incorrect for the selected country.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required.' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'Password mismatch.' }
    ],
    'terms': [
      { type: 'pattern', message: 'You must accept terms and conditions.' }
    ],
  };

}
