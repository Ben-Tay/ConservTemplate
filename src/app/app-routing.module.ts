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
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'book-appointment', loadChildren: './book-appointment/book-appointment.module#BookAppointmentPageModule' },
  { path: 'pick-service', loadChildren: './pick-service/pick-service.module#PickServicePageModule' },
  { path: 'contact', loadChildren: './contact/contact.module#ContactPageModule' },
  { path: 'testimonials', loadChildren: './testimonials/testimonials.module#TestimonialsPageModule' },
  { path: 'office-hours', loadChildren: './office-hours/office-hours.module#OfficeHoursPageModule' },
  { path: 'my-appointments', loadChildren: './my-appointments/my-appointments.module#MyAppointmentsPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'services', loadChildren: './services/services.module#ServicesPageModule' },
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
  { path: 'erjobs', loadChildren: './erjobs/erjobs.module#ERJobsPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

