import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../shared/models/User';
import { UserService } from '../shared/services/user.service';
import { PhoneValidator } from '../validators/phone.validator';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.page.html',
  styleUrls: ['./updateprofile.page.scss'],
})
export class UpdateprofilePage implements OnInit {
  UpdateForm: FormGroup;
  country_phone_group: FormGroup;

  gender: string[];
  userEmail: string;
  userPassword: string;
  birthday: Date;
  Userdata: User;

  constructor(private formbuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.userService.observeAuthState(user => {
      //	User	is	logged	in
      if (user) {
        this.userEmail = user.email
        this.userService.getUserInfoNoImage(user.email)
          .subscribe(data => {
            this.Userdata = data
            if (this.Userdata) {
              this.UpdateForm.controls.name.setValue(this.Userdata.name)
              this.UpdateForm.controls.gender.setValue(this.Userdata.gender)
              this.UpdateForm.controls.birthday.setValue(this.Userdata.birthday.toDateString())
              this.UpdateForm.controls.address.setValue(this.Userdata.address)
              this.UpdateForm.get(['country_phone', 'phone']).setValue(this.Userdata.phoneno)
              this.userPassword = this.Userdata.password
            }
          })
      }
      //	User	has	logged	out
      else {
        this.userEmail = undefined;
      }
    });

    let country = new FormControl('Singapore', Validators.required);
    let phone = new FormControl('', Validators.compose([
      Validators.required,
      PhoneValidator.validCountryPhone(country)
    ]));

    this.country_phone_group = new FormGroup({
      country: country,
      phone: phone
    });

    this.gender = ["Male", "Female"];

    this.UpdateForm = this.formbuilder.group({
      name: new FormControl('', [Validators.required]),

      gender: new FormControl('', [Validators.required]),

      birthday: new FormControl('', [Validators.required]),

      address: new FormControl('', [Validators.required]),

      country_phone: this.country_phone_group
    })
  }

  ngOnInit() {
  }

  update() {
    if (this.UpdateForm.valid) {
      const updatedata = new User(this.UpdateForm.value.name, this.UpdateForm.value.gender, this.UpdateForm.value.birthday, this.userEmail, this.userPassword, this.UpdateForm.controls['country_phone'].value.phone, this.UpdateForm.value.address)

      this.userService.updateProfile(updatedata)
      this.router.navigate(['/users'])
    }
  }

  cancel() {
    this.router.navigate(['/users']);
  };

  validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'gender': [
      { type: 'required', message: 'Gender is required' }
    ],
    'birthday': [
      { type: 'required', message: 'Birthday is required' }
    ],
    'address': [
      { type: 'required', message: 'Address is required' }
    ],
    'phone': [
      { type: 'required', message: 'Phone is required.' },
      { type: 'validCountryPhone', message: 'The phone is incorrect for the selected country.' }
    ]
  };
}
