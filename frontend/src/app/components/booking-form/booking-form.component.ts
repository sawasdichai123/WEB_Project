import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import axios from 'axios';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {
  bookingForm: FormGroup;
  bookingId: string | null;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.bookingForm = new FormGroup({
      user_name: new FormControl('', Validators.required),
      package_name: new FormControl('', Validators.required),
      booking_date: new FormControl('', Validators.required),
      status: new FormControl('Pending', Validators.required)
    });
    this.bookingId = null;
  }

  ngOnInit(): void {
    this.bookingId = this.route.snapshot.paramMap.get('id');
    if (this.bookingId) {
      this.getBooking(this.bookingId);
    }
  }

  getBooking(id: string) {
    axios.get(`/api/bookings/${id}`)
      .then(response => {
        this.bookingForm.setValue({
          user_name: response.data.user_name,
          package_name: response.data.package_name,
          booking_date: response.data.booking_date,
          status: response.data.status
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  onSubmit() {
    if (this.bookingId) {
      // อัปเดตการจองที่มีอยู่
      axios.put(`/api/bookings/${this.bookingId}`, this.bookingForm.value)
        .then(response => {
          this.router.navigate(['/']);
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      // สร้างการจองใหม่
      axios.post('/api/bookings', this.bookingForm.value)
        .then(response => {
          this.router.navigate(['/']);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
}