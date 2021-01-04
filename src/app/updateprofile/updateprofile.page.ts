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
  data: User;
  updateddata: User;

  constructor(private formbuilder: FormBuilder, private userService: UserService, private router: Router) {
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

  cancel(){
    this.router.navigate(['/profile']);
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
    'phone': [
      { type: 'required', message: 'Phone is required.' },
      { type: 'validCountryPhone', message: 'The phone is incorrect for the selected country.' }
    ]
  };
}
