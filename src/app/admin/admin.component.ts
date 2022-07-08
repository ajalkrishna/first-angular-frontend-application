import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private fb:FormBuilder,private prod:ProductsService) { }
  newProduct;
  ngOnInit(): void {
    this.newProduct=this.fb.group({
      title:[''],
      price:[''],
      description:[''],
      category:[''],
      image:[''],
      rating:['']
    })
    
  }

  // Adding new product by admin
  addProduct(){
    // this.prod.addNewProduct(this.newProduct.value).subscribe()
    console.log(this.newProduct.value);
    


    
  }

}
