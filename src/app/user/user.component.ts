import { Component, OnInit } from '@angular/core';
import { faCartPlus, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../api.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user = faUser
  cart = faCartPlus
  close = faTimes

  constructor(private apiService: ApiService, private prod: ProductsService) { }

  userData;
  cartCount;
  ngOnInit(): void {
    this.apiService.observableData.subscribe({
      next: (res) => {
        this.userData = res

        // updating the cartcount on page loading-if cart has items 
        this.prod.userCartExistance(res).subscribe({
          next: (cartData) => {
            if (cartData.length != 0) {
              this.prod.cartData.next(cartData[0].products.length)
            }
            else {
              this.prod.cartData.next(0) //if cart has no item
            }
          }

        })

      },
      error: (err) => { alert('something went wrong') }
    })
    // Showing the Count on page loading
    this.prod.cartObservable.subscribe(count => this.cartCount = count)
  }

}
