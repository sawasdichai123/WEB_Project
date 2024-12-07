import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.css']
})
export class BookingDetailComponent implements OnInit {
  bookingId: string | null;
  booking: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.bookingId = null;
    this.booking = null; // แก้ไขจาก {} เป็น null
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
        this.booking = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  }

  backToList() {
    this.router.navigate(['/']);
  }
}