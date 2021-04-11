import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { BookingserviceService } from '../bookingservice.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router:Router, private fb:FormBuilder,private bs:BookingserviceService) { }
registerform:any;
  ngOnInit(): void {
    this.registerform = this.fb.group({
      customerName:['',Validators.required],
      emailid:['',Validators.required],
      pwd:['',Validators.required]
    })
  }

  register():void{
    this.bs.registerUser(this.registerform.value).subscribe((res)=>{
      alert("Registered Successfully");
      this.router.navigateByUrl('/login');
    },
    (err)=>console.log(err)
    )
}
}
