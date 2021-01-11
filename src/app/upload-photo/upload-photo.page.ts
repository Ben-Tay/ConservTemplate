import { Component, OnInit } from '@angular/core';
import {  FormGroup} from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CameraResultType, CameraSource, Plugins } from '@capacitor/core';
import { ToastController } from '@ionic/angular';
import { User } from '../shared/models/User';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.page.html',
  styleUrls: ['./upload-photo.page.scss'],
})
export class UploadPhotoPage implements OnInit {

  addPhotoForm: FormGroup;
  categories: string[];
  submitted: boolean = false;
  photo: SafeResourceUrl;
  user: User;
  userEmail: string;
  constructor(
    private router: Router,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private toastCtrl: ToastController,
    private route: ActivatedRoute) {

    this.addPhotoForm = new FormGroup({
    })
    setInterval(() => {
      this.userEmail = this.route.snapshot.params.email;

      this.userService.getUserInfoNoImage(this.userEmail)
        .subscribe(async data => {
          this.user = data;
        })
    })

  }


  ngOnInit() {
  }

  async add() {
    //retrieve earlier user details
    const user = this.user;
    //create new user object and update image field for that user
    const user_with_image = new User(user.name, user.gender, user.birthday, user.email,
      user.password, user.phoneno, user.address, this.photo)
    //check for whether user selected photo
    if (this.photo) {
      this.userService.addImageToUser(user_with_image).subscribe();

      //notify user upon upload
      let toast = await this.toastCtrl.create({
        message: 'Your profile picture has been uploaded!',
        position: 'top',
        duration: 1000
      })
      toast.present()

      //Navigate to login page
      this.tologin();
    } else {
      let toast = await this.toastCtrl.create({
        message: 'Please upload a picture',
        position: 'top',
        duration: 1000
      })
      toast.present()
    }

  }

  async takePhoto() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    this.photo =
      this.sanitizer.bypassSecurityTrustResourceUrl(image &&
        (image.dataUrl));
  }

  tologin() {
    this.router.navigate(['login'])
  }

}


