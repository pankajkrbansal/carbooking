import { Component, NgModule, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {BookingserviceService} from '../bookingservice.service';
import {CommonModule} from '@angular/common';
@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {
  bookingform:any;
  constructor(private fb:FormBuilder,private bs:BookingserviceService) { }
//bookingform;
data='';  
ngOnInit(): void {
  this.bookingform = this.fb.group({
    customerId: ['',[Validators.required,this.validateCustID]],
    carId:['',Validators.required],
    dateOfBooking:['',[Validators.required,this.pastDate]],
    price:['',Validators.required]
  });

}
  submit():void{
   // console.log(this.data);
    this.bookingform.reset();
  }
  bookCar():void{
    this.bs.bookMyCar(this.bookingform.value).subscribe((res)=>{
      console.log(res);
      //this.submit();
    },
    (err)=>console.log(err)
    );
  }
  validateCustID(c:FormControl){
    let regex = /^[1][0-9]{3}$/;
    if(regex.test(c.value)){
      return true;
    }else{
      return {
        err:{
          message:"Customer Id is of type 1001"
        }
      }
    }
  }
  pastDate(c:FormControl){
    if(c.value>Date()){
      return null;
    }else{
      return {
        derr:{
          message:"Booking Date cannot a past date"
        }
      }
    }
  }
}
