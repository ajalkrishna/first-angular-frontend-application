import { Component, OnInit } from '@angular/core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/api.service';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-usercart',
  templateUrl: './usercart.component.html',
  styleUrls: ['./usercart.component.scss']
})
export class UsercartComponent implements OnInit {

  delete=faTrashAlt
  cartItems:any[]=[];
  cartData;
  constructor(private prod:ProductsService,private api:ApiService) { }

  ngOnInit(): void {
    this.showCartItems()
  }

  deleteFromCart(product){

    let index=this.cartItems.indexOf(product)
    this.prod.getUserCartDataByUsername(this.cartData.username).subscribe({
      next:(userCartData)=>{
        // modifying the data 
        let cartProduct = userCartData[0]
        cartProduct.products.splice(index,1)

        // update the cart
        this.prod.updateCart(cartProduct).subscribe({
          next:(modCart)=>{this.prod.cartData.next(modCart['products'].length)} //update the cartCount
        })

        // refresh the page 
        this.showCartItems()
        
        
        
        
        
      }
    })

    
  }

  // Cart Data Visibility
  showCartItems(){
    this.api.observableData.subscribe({
      next:(userObj)=>{
        // Showing the cart items on user cart page loading 
        this.prod.userCartExistance(userObj).subscribe({
          next:(cartData)=>{
            this.cartItems=cartData[0].products
            this.cartData=cartData[0]
          }
        })
      },
      error:(err)=>{alert('something went wrong')}
    })
  }


}
