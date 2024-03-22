import { Injectable } from '@angular/core';
import { Product } from './products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor() {}

  products: Product[] = [
    {
      productId: 1,
      productName: 'Leaf Rake',
      productCode: 'GDN-0011',
      releaseDate: 'March 19, 2016',
      description: 'Leaf rake with 48-inch wooden handle.',
      price: 19.95,
      starRating: 3.2,
      imageUrl: './assets/images/Leaf-Rake.png',
    },
    {
      productId: 2,
      productName: 'Garden Cart',
      productCode: 'GDN-0023',
      releaseDate: 'March 18, 2016',
      description: '15 gallon capacity rolling garden cart',
      price: 32.99,
      starRating: 4.2,
      imageUrl: './assets/images/garden-cart.png',
    },
    {
      productId: 5,
      productName: 'Hammer',
      productCode: 'TBX-0048',
      releaseDate: 'May 21, 2016',
      description: 'Curved claw steel hammer',
      price: 8.9,
      starRating: 4.8,
      imageUrl: './assets/images/rejon-Hammer.png',
    },
    {
      productId: 8,
      productName: 'Saw',
      productCode: 'TBX-0022',
      releaseDate: 'May 15, 2016',
      description: '15-inch steel blade hand saw',
      price: 11.55,
      starRating: 3.7,
      imageUrl: './assets/images/egore911-saw.png',
    },
    {
      productId: 10,
      productName: 'Video Game Controller',
      productCode: 'GMG-0042',
      releaseDate: 'October 15, 2015',
      description: 'Standard two-button video game controller',
      price: 35.95,
      starRating: 4.6,
      imageUrl: './assets/images/xbox-controller.png',
    },
  ];
  getProductList() {
    return this.products;
  }
  getProductId(id: number): Product | undefined {
    return this.products.find((item) => item.productId === id);
  }
  AutoId(){
    var max=1;
    this.products.forEach(item=>{
      if(item.productId>max){
        max=item.productId;
      }
    })
    return max+1;
  }
 AddProduct(frmProduct:any,fileImg:string){
  let id=this.products.push(frmProduct)-1;
  this.products[id].imageUrl=fileImg;

 }
 EditProduct(id:number){
    return this.products[id];
 }
 UpdateProduct(id:number,frmProduct:any,fileImg:string){
  this.products[id].productName=frmProduct.productName;
  this.products[id].productCode=frmProduct.productCode;
  this.products[id].releaseDate=frmProduct.releaseDate;
  this.products[id].description=frmProduct.description;
  this.products[id].price=frmProduct.price;
  this.products[id].imageUrl=fileImg;

 }
 DeleteProduct(id:number){
  this.products.splice(id,1);
 }
}
