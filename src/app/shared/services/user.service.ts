import { Injectable } from '@angular/core';
import { User } from '../models/User';
import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth'
import 'firebase/firestore';
import 'firebase/storage';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userRef = firebase.firestore().collection("users")

  constructor() { }

  observeAuthState(func) {
    return firebase.auth().onAuthStateChanged(func);
  }

  signup(p: User) {
    return firebase.auth().createUserWithEmailAndPassword(p.email, p.password);
  }

  signupContinue(p: User) {
    this.userRef.doc(p.email).set({
      name: p.name,
      address: p.address,
      birthday: new Date(p.birthday),
      gender: p.gender,
      email: p.email,
      password: p.password,
      phoneno: p.phoneno
    });
  }

  getUserByEmail(id: string) {
    return this.userRef.doc(id).get().then((doc) => {
        let data = doc.data();
        let user = new User(data.name, data.gender, data.birthday,
          data.email, data.password, data.phoneno, data.address, data.image);
        return user;
      });
  }

  addImageToUser(p: User): Observable<any> {
    return new Observable((observer) => {
      this.userRef.doc(p.email).get()
      .then(() => {
        //         observer.next(p);
        if (p.image) {
          const dataUrl = p.image.changingThisBreaksApplicationSecurity;
          const imageRef = firebase.storage().ref().child(p.email +"/profilepic.jpg");
          imageRef.putString(dataUrl,
            firebase.storage.StringFormat.DATA_URL).then(() => {
              const ref = this.userRef.doc(p.email);
              ref.update({ image: p.email + "/profilepic.jpg"});
            });
        }
      });
    })
  }

  login(email: string, password:	string)	{	
    return firebase.auth().signInWithEmailAndPassword(email, password);	
}
  
  logout() {
    return firebase.auth().signOut();
  }

  updateProfile(p: User) {
    const ref = firebase.firestore().collection('users').doc(p.email);
    ref.update({
      name: p.name,
      address: p.address,
      birthday: new Date(p.birthday),
      gender: p.gender,
      phoneno: p.phoneno,
      image: p.image
    });
  }

  getUserInfoNoImage(id:string): Observable<any> {
    return new Observable(observer => {
      // Read collection '/users'
      firebase.firestore().collection('users').doc(id).get().then((doc) => {
        let loan = new User(doc.data().name, doc.data().gender, doc.data().birthday, doc.data().email, doc.data().password, doc.data().phoneno, doc.data().address);
        observer.next(loan);
      });
    });
  }
}
