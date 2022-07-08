import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductslistComponent } from '../products/productslist/productslist.component';
import { UserComponent } from './user.component';
import { UsercartComponent } from './usercart/usercart.component';

const routes: Routes = [{ path: '', component: UserComponent, children:[
  {path:'usercart',component:UsercartComponent},
  {path:'products',component:ProductslistComponent},
  {path:'',redirectTo:'products',pathMatch:'full'}
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
