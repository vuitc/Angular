import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginForm, RegisterForm, Users } from './auth';
import { Observable, map, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: boolean = false;
  role:any=null;
  isloading: boolean = false;
  Users: Users[] = [];
  private baseURL = 'http://localhost:3000/users';
  constructor(private router: Router, private http: HttpClient) {}
  login(form: LoginForm) {
    let flag = this.isValid(form.email, form.password);
    if (!!flag) {
      this.isAuthenticated = true;
      // Lấy role và lưu vào localStorage
      this.getAllUserList().subscribe(users => {
        const user = users.find(u => u.email === form.email && u.password === form.password);
        if (user) {
          this.role = user.role;
          localStorage.setItem('userRole', this.role.toString());
        }
      });
  
      this.router.navigate(['']);
    } else {
      alert('Không thể đăng nhập');
      this.isAuthenticated = false;
    }
  }
  

  register(form: RegisterForm) {

    this.AddUser(form.email, form.password).subscribe(() => {
      alert('Thêm tài khoản thành công');
      this.router.navigate(['login']);
      this.isAuthenticated = false; 
    });
  }
  logout() {
    localStorage.removeItem('userRole');
    this.router.navigate(['login']);
    this.isAuthenticated = false;
  }
  getAllUserList(): Observable<Users[]> {
    return this.http
      .get<Users[]>(this.baseURL)
      .pipe(tap((users) => (this.Users = users)));
  }
  isValid(email: string, password: string) {
    return this.getAllUserList().pipe(
      map(users => {
        const user = users.find(u => u.email === email);
        if(user){
          this.role = user.role;
        }
        return !!user; // Convert to boolean
      })
    );
  }
  AddUser(email: string, password: string,role=0): Observable<Users[]> {
    return this.http.get<Users[]>(this.baseURL).pipe(
      switchMap((users) => {
        const maxId = users.reduce((max, u) => Math.max(max, Number(u.id)), 0);
        const newID = (maxId + 1).toString();
        const newUser: Users = {
          id: newID,
          email: email,
          password: password,
          role:role,
        };
        alert('Thêm thành công');
        return this.http.post<Users[]>(this.baseURL, newUser);
      })
    );
  }  
  DeleteAuth(id: number): Observable<Users[]> {
    return this.http.delete<Users[]>(`${this.baseURL}/${id}`).pipe(
      switchMap(() => this.getAllUserList()) 
    );
  }

}
