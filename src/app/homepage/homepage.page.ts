import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {
  userEmail: string;

  constructor(private router: Router, private	authService: UserService) { 

    this.authService.observeAuthState(user	=>	{
      //	User	is	logged	in
    if	(user)	{	
          this.userEmail	=	user.email;	
    }	
      //	User	has	logged	out
    else	{	
        this.userEmail	=	undefined;		
    }	
            
  });
}

logout()	{	
  this.authService.logout();
  this.router.navigate(['/home'])	
}

profile(){
  this.router.navigate(['users']);
}
ngOnInit() {
}

}
