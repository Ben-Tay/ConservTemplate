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
    return firebase.auth().createUserWithEmailAndPassword(email,	password);
  }

  signupcontinue(p: User){
    var data = {
      name: p.name,
      gender: p.gender,
      address: p.address,
      email: p.email,
      password: p.password,
      phoneno: p.phoneno,
      birthday: new Date(p.birthday)
    }
    firebase.firestore().collection('users').add(data)
  }
}
