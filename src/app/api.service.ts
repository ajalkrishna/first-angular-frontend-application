import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // User Data
  userBehaviourObj=new BehaviorSubject<any>(null)
  observableData=this.userBehaviourObj.asObservable()

  constructor(private httpObj:HttpClient) { }

  userLoginStatus:boolean=false

  // post data into api
  addUserData(userObj):Observable<any>{
    return this.httpObj.post('http://localhost:3000/users',userObj)
  }
  // Creating query params

  getDataOnLogin(userObj):Observable<any>{
    let params = new HttpParams()
      .set('username',userObj.username)
      .set('password',userObj.password)
    
    return this.httpObj.get(`http://localhost:3000/users/?${params.toString()}`)
  }


}
