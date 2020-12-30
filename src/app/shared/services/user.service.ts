import { Injectable } from '@angular/core';
import { User } from '../models/User';
import	firebase	from	'firebase/app';	
import	'firebase/analytics';	


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  observeAuthState(func)	{	
    return	firebase.auth().onAuthStateChanged(func);	
  }

  signup(p: User)	{	
    return firebase.auth().createUserWithEmailAndPassword(p.email,	p.password);
  }

  signupContinue(p: User){
    var data ={email: p.email,
              password: p.password}
    firebase.firestore().collection('users').doc(p.email).set(data)
  }
}
