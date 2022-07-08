import { Component, OnInit } from '@angular/core';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/api.service';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-productslist',
  templateUrl: './productslist.component.html',
  styleUrls: ['./productslist.component.scss']
})
export class ProductslistComponent implements OnInit {

  cart=faCartPlus
  searchTerm;
  searchType;

  constructor(private prod:ProductsService,private api:ApiService) { }
  productsData:any[];
  loginType;
  ngOnInit(): void {
    // get products for displaying in the page
    this.prod.getProductsData().subscribe({
      next:(res)=>{this.prod.productsData.next(res)
      this.prod.productObserve.subscribe(res=>this.productsData=res)
      
  },
      error:(err)=>{alert('something went wrong!!')}
    })

    this.prod.loginObserve.subscribe(res=>this.loginType=res) //controls the view according to the login type
  }

  // Add products to the cart
  addToCart(product){
    // check the existance of userCart
    this.api.observableData.subscribe({ //accessing all the logined user information
      next:(userDataObj)=>{ 
        this.prod.userCartExistance(userDataObj).subscribe({
          next:(userCartArray)=>{
            // No Data Present
            if(userCartArray.length==0){ //checking whether there is any products on the cart
              // create cart Object
              let cart={    //If not, creating a new cartObject
                username:userDataObj.username,
                products:[product]
              }
              this.prod.createNewCart(cart).subscribe(res=>{console.log('res after adding is',res)}) //creating new cartObj in the DB
              // cart count is icrementing by one after adding first item
              this.prod.cartData.next(1)
            }
            // if Data Present
            else{
              let modifiedCart=userCartArray[0]              
              // adding new products
              modifiedCart.products.push(product)
              this.prod.updateCart(modifiedCart).subscribe({
                // updating the count after each time we add new item
                next:(modCart)=>{this.prod.cartData.next(modCart['products'].length)}
                
              })
            }
          },
          error:(err)=>{alert('something went wrong!!')}
        })
      }
    })
    
  }

  // Choose search category
  categorySelection(event){
    this.searchType=event.target.textContent.toLowerCase()
  }

}
