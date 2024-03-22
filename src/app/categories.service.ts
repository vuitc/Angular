import { Injectable } from '@angular/core';
import { Categories } from './categories';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, tap } from 'rxjs';
import { Products } from './products';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private http: HttpClient) {
    
  }
  categories: Categories[] = [];
  
  private baseURL = 'http://localhost:3000/categories';

  // getAllCategoryList(): Observable<Categories[]> {
  //   return this.http.get<Categories[]>(`${this.baseURL}`);
  // }
  getAllCategoryList(): Observable<Categories[]> {
    return this.http.get<Categories[]>(this.baseURL).pipe(
      tap(categories => this.categories = categories) // Cập nhật danh sách categories khi nhận dữ liệu từ server
    );
  }

  getProductId(id: number) {
    return this.http.get<Categories>(`${this.baseURL}/${id}`);
  }
  AutoId() {
    if (this.categories.length === 0) {
      return 1; 
    } else {
      let max = 1;
      this.categories.forEach(item => {
        const itemId = typeof item.id === 'string' ? parseInt(item.id) : item.id;
        if (itemId > max) {
          max = itemId;
        }
      });
      return max + 1;
    }
  }
  
  
  // AddCategory(frmCategory:any):Observable<Categories[]> {
  //  return this.http.post<Categories[]>(`${this.baseURL}`,frmCategory)
  // }
  AddCategory(frmCategory: any): Observable<Categories[]> {
    // Fetch the categories list to determine the new ID
    return this.http.get<Categories[]>(this.baseURL).pipe(
      switchMap((categories) => {
        const maxId = categories.reduce((max, category) => Math.max(max, category.id), 0);
        const newId = maxId + 1;
        frmCategory.id = newId.toString();
        alert('Thêm thành công');
        return this.http.post<Categories[]>(this.baseURL, frmCategory);
      })
    );
  }
  EditCategory(index: number) {
   return  this.categories[index];
  }
  // UpdateCategory(id:number,frmCategory:any):Observable<Categories[]> {
  //   return this.http.put<Categories[]>(`${this.baseURL}/${id}`,frmCategory);
  // }
  // UpdateCategory(id: number, frmCategory: any): Observable<Categories[]> {
  //   return this.http.put<Categories[]>(`${this.baseURL}/${id}`, frmCategory).pipe(
  //     tap(() => {
  //       // Không cần phải cập nhật lại danh sách categories ở đây vì đã được cập nhật trong phương thức GetAllCategoryList
  //     })
  //   );
  // }
  UpdateCategory(id: number, formData: any): Observable<Categories[]> {
    return this.http.put<Categories[]>(`${this.baseURL}/${id}`, formData).pipe(
      tap(() => {
        alert('Cập nhật thành công');
      })
    );
  }
  
  
  DeleteCategory(id: number) {
    return this.http.delete<Categories[]>(`${this.baseURL}/${id}`);
  }
}
