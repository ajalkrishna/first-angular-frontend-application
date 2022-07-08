import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UsercartComponent } from './usercart/usercart.component';
import { ProductsModule } from '../products/products.module';


@NgModule({
  declarations: [
    UserComponent,
    UsercartComponent
  ],
  imports: [
    UserRoutingModule,
    ProductsModule,
  ],
  exports:[UserComponent]
})
export class UserModule { }
