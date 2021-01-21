import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  loginError: string;

  constructor(private router: Router, private	userService: UserService) {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
   }

   login() {
    this.userService.login(	
        this.loginForm.value.email,	this.loginForm.value.password)
        .then(user =>{
          this.router.navigate(['homepage']);
        })	
          .catch(	
              error	=>	this.loginError	=	error.message	
          );	
        }

  ngOnInit() {
  }

  cancel(){
    this.router.navigate(['/home']);
  };

}
