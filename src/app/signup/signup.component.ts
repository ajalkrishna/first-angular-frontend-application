import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  // data for registration
  signupData:FormGroup;
  signup=faUserPlus
  constructor(private fb:FormBuilder,private apiService:ApiService,private route:Router) { }

  ngOnInit(): void {
    this.signupData=this.fb.group({
      name:['',Validators.required],
      dob:['',Validators.required],
      email:['',Validators.required],
      username:['',Validators.required],
      password:['',Validators.required],
      terms:['',Validators.required]
    })
  }
  get name(){return this.signupData.get('name')}
  get terms(){return this.signupData.get('terms')}
  get dob(){return this.signupData.get('dob')}
  get email(){return this.signupData.get('email')}
  get username(){return this.signupData.get('username')}
  get password(){return this.signupData.get('password')}
  
  registerNow(){
    this.apiService.addUserData(this.signupData.value).subscribe({
      next:(res)=>{
        let state = confirm('user registration successfull!! Register another user??')
        if(state==false){
          this.route.navigateByUrl('login')
        }
        console.log(res)
      },
      error:(err)=>{alert("Something went wrong!!")}
    })
  }

}
