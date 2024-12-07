import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {
  bookings: any[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getBookings();
  }

  getBookings() {
    axios.get('/api/bookings')
      .then(response => {
        this.bookings = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  }

  deleteBooking(id: number) {
    if (confirm('คุณต้องการลบการจองนี้หรือไม่?')) {
      axios.delete(`/api/bookings/${id}`)
        .then(response => {
          this.getBookings();
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  editBooking(id: number) {
    this.router.navigate(['/edit', id]);
  }

  viewBooking(id: number) {
    this.router.navigate(['/detail', id]);
  }
}