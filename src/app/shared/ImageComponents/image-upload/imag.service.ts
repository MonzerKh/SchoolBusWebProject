import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagService {

  constructor(private http: HttpClient) {}


  public uploadImage(image: File): Observable<Response> | any{
    const formData = new FormData();
    const url="";
    formData.append('image', image);
    return this.http.post('/api/v1/image-upload', formData);
  }
}
