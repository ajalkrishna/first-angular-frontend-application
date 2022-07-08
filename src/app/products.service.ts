import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpObj:HttpClient) { }

  productsData=new BehaviorSubject(null)
  productObserve=this.productsData.asObservable()
  productsInCart:any[]=[];
  
  loginType=new BehaviorSubject(null)
  loginObserve=this.loginType.asObservable()

  // Cartcount
  cartData=new BehaviorSubject(0)
  cartObservable=this.cartData.asObservable()

  // Fetch products Data from db.json
  getProductsData():Observable<any>{
    return this.httpObj.get('http://localhost:3000/products')
  }

  addNewProduct(obj):Observable<any>{
    return this.httpObj.post('http://localhost:3000/products',obj)
  }
  
  // cart Operation

  // ?check the existance of userCartObj
  userCartExistance(userObj):Observable<any>{
    let params = new HttpParams().set('username',userObj.username)
    return this.httpObj.get(`http://localhost:3000/cart/?${params.toString()}`)
  }

  // Create New userCartObj in db.json

  createNewCart(cart):Observable<any>{
    return this.httpObj.post('http://localhost:3000/cart',cart)
  }

  // Adding new product to the cart
  updateCart(cartObj):Observable<any>{
    return this.httpObj.put(`http://localhost:3000/cart/${cartObj.id}`,cartObj)
  }

  getUserCartDataByUsername(username){
    let params = new HttpParams().set('username',username)
    return this.httpObj.get(`http://localhost:3000/cart/?${params.toString()}`)
  }

  
}
