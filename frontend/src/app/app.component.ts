import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'จองห้องพัก';
  booking = {
    customerName: '',
    customerPhone: '',
    checkInDate: '',
    checkOutDate: '',
  };

  constructor(private http: HttpClient) {}

  submitBooking() {
    const apiUrl = 'http://localhost:3000/bookings'; 


    this.http.post(apiUrl, {
      customer_name: this.booking.customerName,
      phone_number: this.booking.customerPhone,
      check_in_date: this.booking.checkInDate,
      check_out_date: this.booking.checkOutDate,
    }).subscribe(
      (response) => {
        console.log('Booking saved successfully:', response);
        alert('Booking saved successfully!');

        this.booking = {
          customerName: '',
          customerPhone: '',
          checkInDate: '',
          checkOutDate: '',
        };
      },
      (error) => {
        console.error('Error saving booking:', error);
        alert('Failed to save booking. Please try again.');
      }
    );
  }
}