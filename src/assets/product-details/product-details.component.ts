import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { Product } from '../products';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productDetail: Product|undefined
  constructor(private router: ActivatedRoute, private productService: ProductsService)
  {}
  ngOnInit(): void {
  let id = Number(this.router.snapshot.params['id'])
  this.productDetail = this.productService.getProductId(id)
  }
  }
