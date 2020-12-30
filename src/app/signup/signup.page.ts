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
  }

}
