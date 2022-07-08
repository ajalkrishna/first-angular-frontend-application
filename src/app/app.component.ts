import { Component} from '@angular/core';
import { ApiService } from './api.service';
import { faBullseye, faCartPlus, faHome, faPhoneAlt, faSignInAlt, faSignOutAlt, faStore, faUser } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'appOne';
  login=faSignInAlt
  logout=faSignOutAlt
  home=faHome
  contact=faPhoneAlt
  store=faStore
  toggle=faBullseye
  
 constructor(public apiService:ApiService){}

  changeStatus(){
    this.apiService.userLoginStatus=false
  }
}
