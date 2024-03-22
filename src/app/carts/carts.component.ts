import { Component,OnInit } from '@angular/core';
import { Carts } from '../carts';
import { Products } from '../products';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { CartsService } from '../carts.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css']
})
export class CartsComponent implements OnInit {
  cartList:Carts[]=[];
  productDetail:Products|undefined;
  InStock:number=0;
  constructor(private router:ActivatedRoute, private prod:ProductsService, private cat:CartsService){
    
  }
  ngOnInit(): void {
    let id=Number(this.router.snapshot.params['id']);
    this.prod.getProductId(id).subscribe(data=>{
      this.productDetail=data;
      });
    this.InStock=this.productDetail?.inStock!;
    this.cartList = this.cat.getCartAll();
  }
  Add(index:number){
    this.cat.AddCart(index);
    this.ngOnInit();
  }
  Sum(){

  }
  ItemCount(){
    return this.cat.totalItems();
  }
  ItemsSum(){
    return this.cat.Total();
  }
  ItemSum(index: number): number {
    if (this.cartList && this.cartList.length > index) {
      return this.cat.ItemSum(index);
    }
    return 0;
  }
  
  
  Remove(index:number){
    this.cat.RemoveCart(index);
  }
  DeleteAll(){
    this.cat.DeleteAllCart();
  }
  Log(){
    console.log(this.cartList);
  }
  RemoveItem(index:number){
    this.cat.RemoveItemCart(index);
  }
}
