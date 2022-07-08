import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { faKey, faSignInAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // icons
  userLoginForm: FormGroup;
  userTypeSelect: any[] = ['user', 'admin']
  signin = faSignInAlt
  user = faUser
  key = faKey

  constructor(private fb: FormBuilder, private router: Router, private apiService: ApiService, private prod: ProductsService) { }

  ngOnInit(): void {
    this.userLoginForm = this.fb.group({
      userType: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
  get username() { return this.userLoginForm.get('username') }
  get password() { return this.userLoginForm.get('password') }
  get userType() { return this.userLoginForm.get('userType') }

  // form submit function
  submitForm() {
    let loginObj = this.userLoginForm.value
    // if type user
    if (loginObj.userType == 'user') {
      this.apiService.getDataOnLogin(loginObj).subscribe({
        next: (res) => {
          // adding response to a variable
          let userObj = res[0]

          if (res.length == 0) {
            alert('Invalid Credentials!!')
          }
          else {
            alert('Login Successful!!')
            this.apiService.userLoginStatus = true
            this.apiService.userBehaviourObj.next(userObj)
            this.router.navigateByUrl('user')
            this.prod.loginType.next('user')
          }
        },
        error: (err) => { alert('something went wrong') }
      })
    }
    // if type admin

    if (loginObj.userType == 'admin') {
      if (loginObj.username == 'admin' && loginObj.password == 'admin') {
        this.router.navigateByUrl('admin')
        this.apiService.userLoginStatus = true
        this.prod.loginType.next('admin')

      }
      else { alert('invalid admin credentials!!') }
    }
  }

  // goto registration page
  gotoSignup() {
    this.router.navigateByUrl('signup')
  }

}
