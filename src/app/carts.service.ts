import { Injectable } from '@angular/core';
import { Carts } from './carts';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class CartsService {
  cartList: Carts[] = [];

  constructor(private prod: ProductsService) {
 
  }
  getCartAll(){
    return this.cartList;
  }
  getInStock(id:number){
    return this.cartList.find(i=>i.Id==id)?.InStock;
  }
  addCart(index:number,frmProduct:any){
    let itemInCart=this.cartList.filter(i=>i.Id==index);
    let isItemInCart=itemInCart.length>0;
    if(isItemInCart==false){
      let id=this.cartList.push({
        "Id":frmProduct.id,
        "Name":frmProduct.productName,
        "Code":frmProduct.productCode,
        "Price":frmProduct.price,
        "ImageUrl":frmProduct.imageUrl,
        "InStock":frmProduct.inStock,
        "Quality":0
      })-1;
      this.cartList[id].Quality=this.cartList[id].Quality!+1;
      this.cartList[id].InStock=this.cartList[id].InStock!-1;
      console.log(this.cartList);
      
    }else{
      for(let i=0;i<this.cartList.length;i++){
        if(this.cartList[i].Id==index){
          this.cartList[i].Quality=this.cartList[i].Quality!+1;
          this.cartList[i].InStock=this.cartList[i].InStock!-1;
        }
      }
    }
  }
  totalItems(){
    let sum=0;
    this.cartList.forEach(item=>{
      sum+=item.Quality!;
    });
    return sum;
  }

  ItemSum(index: number): number {
    const item = this.cartList[index];
    return item ? (item.Quality || 0) * (item.Price || 0) : 0;
  }
  
 
  Total(){
    let total=0;
    this.cartList.forEach(item=>{
      total+=(item.Price!*item?.Quality!);
    })
    return total;
  }
  RemoveCart(index:number){
    this.cartList[index].InStock!+=1;
    this.cartList[index].Quality!-=1;
    if(this.cartList[index].Quality==0){
      this.cartList.splice(index,1);
    }
  }
  AddCart(index:number){
    if (this.cartList[index].InStock! > 0) {
      this.cartList[index].InStock! -= 1;
      this.cartList[index].Quality! += 1;
    }
  }
  DeleteAllCart(){
    for(let i=0;i<this.cartList.length;i++){
      this.cartList.splice(i,1);
      i--;
    }
  }
  RemoveItemCart(index: number) {
    this.cartList[index].InStock! += this.cartList[index].Quality!;
    this.cartList.splice(index, 1);
}


}
