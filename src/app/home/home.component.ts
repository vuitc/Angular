import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Categories } from '../categories';
import { CategoriesService } from '../categories.service';
import { Products } from '../products';
import { ProductsService } from '../products.service';
import { CartsService } from '../carts.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categoryList:Categories[]=[];
  dynamicSlides:Products[]=[];
  
  constructor(private cat:CategoriesService, private prod:ProductsService, private cart:CartsService){
  }
  ngOnInit(): void {
      this.cat.getAllCategoryList().subscribe((data)=>{
        this.categoryList=data;
      })
      this.prod.getTopProductList().subscribe((data)=>{
        this.dynamicSlides=data;
        console.log(this.dynamicSlides);
        
      })
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    margin:20,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        items: 1 
      },
      400: {
        items: 2
      },
      760: {
        items: 3
      },
      1000: {
        items: 4
      }
    },
    nav: true
  };
  showRating(event:any){
    alert(`${event}`);
  }
  Add(id:any){
    console.log(id);
    if (this.dynamicSlides) {
      const result = this.dynamicSlides.find((p) => p.id === id);
      if (!!result) {
        this.cart.addCart(id, result);

      }
    }
  }
}
