import { Injectable } from '@angular/core';
import { User } from '../models/User';
import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth'
import 'firebase/firestore';
import 'firebase/storage';
import { Observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userRef = firebase.firestore().collection("users")

  constructor(private loadingCtrl: LoadingController) { }

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
      phoneno: p.phoneno,
      image: 'person-icon.png'
    });
  }

  addImageToUser(p: User): Observable<any> {
    return new Observable((observer) => {
      this.userRef.doc(p.email).get()
        .then(() => {
          observer.next(p);
          if (p.image) {
            const dataUrl = p.image.changingThisBreaksApplicationSecurity;
            const imageRef = firebase.storage().ref().child(p.email + "/profilepic.jpg");
            imageRef.putString(dataUrl,
              firebase.storage.StringFormat.DATA_URL).then(() => {
                const ref = this.userRef.doc(p.email);
                ref.update({ image: p.email + "/profilepic.jpg" });
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
      address: p.address,
      birthday: new Date(p.birthday),
      gender: p.gender,
      name: p.name,
      phoneno: p.phoneno
    });
  }

  getUserInfoNoImage(id: string): Observable<any> {
    return new Observable(observer => {
      // Read collection '/users'
      firebase.firestore().collection('users').doc(id).get().then((doc) => {
        let loan = new User(doc.data().name, doc.data().gender, doc.data().birthday.toDate(), doc.data().email, doc.data().password, doc.data().phoneno, doc.data().address);
        observer.next(loan);
      });
    });
  }

  getUserImage(id: string): Observable<any> {
    return new Observable(observer => {
      // Read collection '/users'
      firebase.firestore().collection('users').doc(id).get().then((doc) => {
        let docdata = doc.data()
        let u = new User(docdata.name, docdata.gender, docdata.birthday.toDate(), docdata.email, docdata.password, docdata.phoneno, docdata.address, docdata.image);
        if (docdata.image) {
          u.imagepath = docdata.image
          const imageRef = firebase.storage().ref().child(docdata.image);
          imageRef.getDownloadURL()
            .then(url => {
              u.image = url;
              //Tell subscriber that image is updated

              observer.next(u);
              console.log('Image is ' + u.image);
            }).catch(error => {
              console.log('Error: Read image fail ' + error);
            });
        }
      });
    });
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      duration: 1500,
      showBackdrop: true,
      spinner: 'lines'
    });
    loading.present();
  }
  
}
