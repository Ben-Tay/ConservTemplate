import { Injectable } from '@angular/core';
import { User } from '../models/User';
import	firebase	from	'firebase/app';	
import	'firebase/analytics';	
import  'firebase/auth'
import  'firebase/firestore';
import  'firebase/storage';
import { Observable } from 'rxjs';



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

  signupContinue(p: User){
    this.userRef.doc(p.email).set({
      name: p.name,
      address: p.address,
      birthday: new Date(p.birthday),
      gender: p.gender,
      email: p.email,
      password: p.password,
      phoneno: p.phoneno,
      image: ""
    });
  }

  logout()	{	
    return	firebase.auth().signOut();	
  }

  updateProfile(p:User)	{	
    const ref = firebase.firestore().collection('users').doc(p.email);
    ref.update({
      name: p.name,
      address: p.address,
      birthday: new Date(p.birthday),
      gender: p.gender,
      phoneno: p.phoneno
    });
  }
}
