import { Injectable } from '@angular/core';
import { Products } from './products';
import { HttpClient } from '@angular/common/http';

import { Observable, switchMap, tap } from 'rxjs';
import { Categories } from './categories';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products:Products[]=[];
  topProducts:Products[]=[];
  constructor (private http:HttpClient){

  }
  private baseURL='http://localhost:3000/products';
  // getAllProductList():Observable<Products[]>{
  //   return this.http.get<Products[]>(`${this.baseURL}`);
  // }
  getAllProductList():Observable<Products[]>{
    return this.http.get<Products[]>(this.baseURL).pipe(
      tap(products=>this.products=products)
    );
  }
  // getAllProductListByIdCategory(categoryId: number): Observable<Products[]> {
  //   return this.http.get<Products[]>(`${this.baseURL}?categoryId=${categoryId}`);
  // }
  // getProductId(id:number){
  //   return this.http.get<Products>(`${this.baseURL}/${id}`)
  
  // }
  // getTopProductList(): Observable<Products[]> {
   
  //   return this.http.get<Products[]>(`${this.baseURL}?_sort=releaseDate&_limit=5`);
  // }
  getAllProductListByIdCategory(categoryId: number): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.baseURL}?categoryId=${categoryId}`).pipe(
      tap(products => this.products = products)
    );
  }
  
  getProductId(id:number){
    return this.http.get<Products>(`${this.baseURL}/${id}`)
  }
  
  getTopProductList(): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.baseURL}?_sort=releaseDate&_limit=5`).pipe(
      tap(products => this.topProducts = products)
    );
  }
  AutoId(): number {
    return Math.max(...this.products.map(item => item.id), 0) + 1;
  }
  
  AddProduct(frmProduct:any):Observable<Products[]>{
    return this.http.get<Products[]>(this.baseURL).pipe(
      switchMap((products)=>{
        const maxId=products.reduce((max,product)=>Math.max(max,product.id),0);
        const newID=maxId+1;
        frmProduct.id=newID.toString();
        return this.http.post<Products[]>(this.baseURL,frmProduct);
        alert("Thêm thành công");
      })
    )
  }
  DeleteProduct(id: number): Observable<Products[]> {
    return this.http.delete<Products[]>(`${this.baseURL}/${id}`).pipe(
      switchMap(() => this.getAllProductList()) 
    );
  }
  EditProduct(id: number):Products|undefined{
    return this.products.find(product => product.id === id);
  }
  // UpdateProduct(id:number,formProduct:any):Observable<Products[]>{
  //   let ids=id.toString();
  //   console.log(ids);
    
  //   return this.http.put<Products[]>(`${this.baseURL}/{ids}`,formProduct).pipe(
  //     tap(()=>{
  //       console.log("Thành công");    
  //     })
  //   )
  // }
  UpdateProduct(id: number, formProduct: any): Observable<Products[]> {
    const url = `${this.baseURL}/${id}`;
    return this.http.put<Products[]>(url, formProduct).pipe(
      tap(() => {
        alert("Cập nhật thành công");
      })
    );
  }
  
}