import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { BookingFormComponent } from './components/booking-form/booking-form.component';
import { BookingDetailComponent } from './components/booking-detail/booking-detail.component';

export const routes: Routes = [
  { path: '', component: BookingListComponent },
  { path: 'create', component: BookingFormComponent },
  { path: 'edit/:id', component: BookingFormComponent },
  { path: 'detail/:id', component: BookingDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }