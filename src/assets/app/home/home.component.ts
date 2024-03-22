import { Component } from '@angular/core';
import { Product } from '../products';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
 products:Product[]=[]
  searching: string = "";
filterProductList:Product[] = [];
 //lấy dữ liệu bài 1
  constructor(private prod:ProductsService) {
    this.products=prod.getProductList();  
  this.filterProductList = this.products
  }
  filterResults() {
  console.log(this.searching)
  if (!this.searching) {
  this.filterProductList = this.products
  }
  this.filterProductList = this.products.filter(
  list => list?.productName.toLowerCase().includes (this.searching.toLowerCase())
  )
  }

 

}
