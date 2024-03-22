import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../products';
import { CategoriesService } from '../categories.service';
import { ProductsService } from '../products.service';
import { Categories } from '../categories';
import { CartsService } from '../carts.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit{
  productShop:Products[]=[];
  productShopFilter:Products[]=[];
  categories:Categories[]=[];
  seaching:string='';
  InStock=0;
  constructor( private router:ActivatedRoute,private cat:CategoriesService, private prod:ProductsService, private cart:CartsService){
    
  }
  ngOnInit(): void {
      let id=Number(this.router.snapshot.params['id']);
      this.router.params.subscribe(params => {
        let id = Number(params['id']);
        this.prod.getAllProductListByIdCategory(id).subscribe((data) => {
          this.productShop = data;
          this.productShopFilter=this.productShop;
        });
      });
      this.cat.getAllCategoryList().subscribe((data)=>{
        this.categories=data;
      })
  }
  resultFilter(){
    if(!this.seaching){
        this.productShopFilter=this.productShop;
    }else{
      this.productShopFilter=this.productShop.filter(list=>list?.productName.toLowerCase().includes(this.seaching.toLowerCase()));
    }
  }
  showRating(event:any){
    alert(`${event}`);
  }
  Add(id:any){
    console.log(id);
    
    if (this.productShopFilter) {
      const result = this.productShopFilter.find((p) => p.id === id);
      if (!!result) {
        this.cart.addCart(id, result);

      }
    }
  }
}
