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
  userwithimg: User;
  final_user: User;

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
      this.userService.observeAuthState(user => {
        //	User	is	logged	in
        if (user) {
          this.userEmail = user.email
          this.userService.getUserInfoNoImage(user.email)
            .subscribe(async data => {
              this.user = data;
              this.final_user = new User(this.user.name, this.user.gender, this.user.birthday, this.user.email,
                this.user.password, this.user.phoneno, this.user.address, this.photo)

            })
        } else {
          this.userEmail = undefined;
        }
      })
    })

  }


  ngOnInit() {
    this.showLoading();
    //to display user profile pic on page
    this.userService.observeAuthState(user => {
      //	User	is	logged	in
      if (user) {
        this.userService.getUserImage(user.email)
          .subscribe(async data => {
            this.userwithimg = data;
          })
      }
    })

  }

  async add() {
    //retrieve earlier user details
    //check for whether user selected photo
    if (this.photo) {
      //create new user object and update image field for that user

      this.userService.addImageToUser(this.final_user).subscribe();

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
