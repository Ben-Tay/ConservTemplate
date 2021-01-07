import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CameraResultType, CameraSource, Plugins } from '@capacitor/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from '../shared/models/User';
import { UserService } from '../shared/services/user.service';
@Component({
  selector: 'app-updatephoto',
  templateUrl: './updatephoto.page.html',
  styleUrls: ['./updatephoto.page.scss'],
})
export class UpdatephotoPage implements OnInit {

  addPhotoForm: FormGroup;
  categories: string[];
  submitted: boolean = false;
  photo: SafeResourceUrl;
  user: User;
  user_with_image: User;
  userEmail: string;
  default: boolean = true;
  constructor(
    private router: Router,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private route: ActivatedRoute) {

    this.addPhotoForm = new FormGroup({
    })
    setInterval(() => {
      // this.userEmail = this.route.snapshot.params.email;
      this.userService.getUserImage("Dan@gmail.com")
        .subscribe(async data => {
          this.user_with_image = data;
        })

      this.userService.getUserByEmail("Dan@gmail.com")
        .then(async data => {
          this.user = data;
        })
    })

  }


  ngOnInit() {
    this.showLoading();
  }

  async add() {
    //retrieve earlier user details
    const user = this.user;
    //create new user object and update image field for that user
    const user_with_image = new User(user.name, user.gender, user.birthday, user.email,
      user.password, user.phoneno, user.address, this.photo)
    //check for whether user selected photo
    if (this.photo!) {
      this.userService.addImageToUser(user_with_image).subscribe();

      //notify user upon upload
      let toast = await this.toastCtrl.create({
        message: 'Your profile picture has been uploaded!',
        position: 'top',
        duration: 1000
      })
      toast.present()
      this.toProfile();
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

    this.default = false;

  }

  toProfile() {
    this.router.navigate(['profile'])
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      duration: 2000,
      showBackdrop: true,
      spinner: 'lines'
    });
    loading.present();
  }

}
