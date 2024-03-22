import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../products';
import { ProductsService } from '../products.service';
import { Location } from '@angular/common';
import { CartsService } from '../carts.service';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  productDetail: Products | undefined;
  InStock:number=0;
  constructor(
    private router: ActivatedRoute,
    private prod: ProductsService,
    private cat:CartsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    let id = Number(this.router.snapshot.params['id']);
    this.prod.getProductId(id).subscribe((data) => {
      this.productDetail = data;
    });
  }
  showRating(event: any) {
    alert(`${event}`);
  }
  goBack(): void {
    this.location.back();
  }

  Add(){
    if (this.productDetail) {
      this.cat.addCart(this.productDetail.id!, this.productDetail);
      this.InStock = this.cat.getInStock(this.productDetail.id!)!;
    }
  }
}
