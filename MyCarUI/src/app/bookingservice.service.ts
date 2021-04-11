import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BookingserviceService {

  constructor(private http:HttpClient) { }

  //function to bookcar
  bookMyCar(data:Object):Observable<Object>{
    return this.http.post<Object>("http://localhost:3000/bookCar/",data);
  }
  registerUser(data:Object):Observable<Object>{
    return this.http.post<Object>("http://localhost:3000/register/",data);
  }
  loginUser(data:Object):Observable<Object>{
    return this.http.post<Object>("http://localhost:3000/login/",data);
  }
}

