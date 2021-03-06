import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  { path: 'book-appointment', loadChildren: './book-appointment/book-appointment.module#BookAppointmentPageModule' },
  { path: 'contact', loadChildren: './contact/contact.module#ContactPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'upload-photo/:email', loadChildren: './upload-photo/upload-photo.module#UploadPhotoPageModule' },
  { path: 'updateprofile', loadChildren: './updateprofile/updateprofile.module#UpdateprofilePageModule' },
  { path: 'clientjobs', loadChildren: './clientjobs/clientjobs.module#ClientjobsPageModule' },
  { path: 'all-errand-requests', loadChildren: './all-errand-requests/all-errand-requests.module#AllErrandRequestsPageModule' },
  { path: 'errand-details/:id', loadChildren: './errand-details/errand-details.module#ErrandDetailsPageModule' },
  { path: 'updatephoto', loadChildren: './updatephoto/updatephoto.module#UpdatephotoPageModule' },
  { path: 'clientjobsnotification/:id', loadChildren: './clientjobsnotification/clientjobsnotification.module#ClientjobsnotificationPageModule' },
  { path: 'homepage', loadChildren: './homepage/homepage.module#HomepagePageModule' },
  { path: 'users', loadChildren: './users/users.module#UsersPageModule' },
  { path: 'userprofile/:id', loadChildren: './userprofile/userprofile.module#UserprofilePageModule' },
  { path: 'erjobs', loadChildren: './erjobs/erjobs.module#ERJobsPageModule' },
  { path: 'rejectreason', loadChildren: './rejectreason/rejectreason.module#RejectreasonPageModule' },
  { path: 'payment-client/:id', loadChildren: './payment-client/payment-client.module#PaymentClientPageModule' },
  { path: 'payment-errandrunner/:id', loadChildren: './payment-errandrunner/payment-errandrunner.module#PaymentErrandrunnerPageModule' },
  { path: 'confirm-payment', loadChildren: './confirm-payment/confirm-payment.module#ConfirmPaymentPageModule' },
  { path: 'confirm-receivepayment', loadChildren: './confirm-receivepayment/confirm-receivepayment.module#ConfirmReceivepaymentPageModule' },
  { path: 'paynow', loadChildren: './paynow/paynow.module#PaynowPageModule' },
  { path: 'carddetails', loadChildren: './carddetails/carddetails.module#CarddetailsPageModule' },
  { path: 'paymentcomplete', loadChildren: './paymentcomplete/paymentcomplete.module#PaymentcompletePageModule' },
  { path: 'receivepayment', loadChildren: './receivepayment/receivepayment.module#ReceivepaymentPageModule' },
  { path: 'eroverdue', loadChildren: './eroverdue/eroverdue.module#ERoverduePageModule' },
  { path: 'clientoverdue', loadChildren: './clientoverdue/clientoverdue.module#ClientoverduePageModule' },
  { path: 'review/:email', loadChildren: './review/review.module#ReviewPageModule' },
  { path: 'post/:email', loadChildren: './post/post.module#PostPageModule' },
  { path: 'users/:email', loadChildren: './users/users.module#UsersPageModule' },
  { path: 'changedate', loadChildren: './changedate/changedate.module#ChangedatePageModule' },
  { path: 'app-notification', loadChildren: './app-notification/app-notification.module#AppNotificationPageModule' },
  { path: 'erapp-notification', loadChildren: './erapp-notification/erapp-notification.module#ErappNotificationPageModule' }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
