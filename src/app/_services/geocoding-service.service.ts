import { google } from 'google-maps';
import { Observable, Observer } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class GeocodingServiceService {

  geocoder: google.maps.Geocoder;

  constructor() {
      this.geocoder = new google.maps.Geocoder();
  }



}
