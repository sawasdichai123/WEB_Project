import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component'; // แก้ path ให้ตรงกับตำแหน่งจริง
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, FormsModule, HttpClientModule),
  ],
}).catch((err) => console.error(err));