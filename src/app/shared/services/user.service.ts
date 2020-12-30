import { Injectable } from '@angular/core';
import { User } from '../models/User';
import	firebase	from	'firebase/app';	
import	'firebase/analytics';	
import 'firebase/auth'


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userRef = firebase.firestore().collection("users")

  constructor() { }

  observeAuthState(func)	{	
    return	firebase.auth().onAuthStateChanged(func);	
  }

  signup(p: User)	{	
    return firebase.auth().createUserWithEmailAndPassword(p.email,	p.password);
  }

  signupContinue(email:	string,	password:	string){
    this.userRef.add({email: email,
                      password: password
    });
  }
}
