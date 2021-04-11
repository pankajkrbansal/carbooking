import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BookingserviceService } from '../bookingservice.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private fb: FormBuilder,private bs: BookingserviceService) { }
loginform:any
  ngOnInit(): void {
    this.loginform = this.fb.group({
      emailid:["",Validators.required],
      pwd:["",Validators.required]
    })
  }



  login(){
  this.bs.loginUser(this.loginform.value).subscribe((res)=>{
    alert("Successfully Logged in!!!");
    let emailid="";
    localStorage.setItem(emailid,this.loginform.value.emailid)
    this.router.navigateByUrl('view');
  },
  (err)=>console.log(err)
  )
}
}
