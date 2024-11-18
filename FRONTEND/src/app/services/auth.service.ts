import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  // http = inject(HttpClient);

  

  register(name: string, email: string, password: string) {
    return this.http.post(environment.apiUrl + '/auth/register', {
      name,
      email,
      password,
    });
  }


  forgotPassword(email: string) {
    return this.http.post(environment.apiUrl + '/auth/forgot-password', { email });
  }
  

  
  
  

  
  
  // login(email: string, password: string) {
  //   return this.http.post(environment.apiUrl + '/auth/login', {
  //     email,
  //     password,
  //   });
  // }

  // login(email: string, password: string) {
  //   return this.http
  //     .post(environment.apiUrl + '/auth/login', { email, password })
  //     .pipe(
  //       catchError((error) => {
  //         // Xử lý lỗi phía server trả về
  //         return throwError(() => error.error.message || 'Đăng nhập thất bại');
  //       })
  //     );
  // }


  login(email: string, password: string) {
    return this.http.post(environment.apiUrl + '/auth/login', { email, password })
      .pipe(
        tap((response: any) => {
      
          localStorage.setItem('user', JSON.stringify(response.user));  
          localStorage.setItem('token', response.token);
          this.router.navigate(['/']);
        }),
        catchError((error) => {
          return throwError(() => error.error.message || 'Đăng nhập thất bại');
        })
      );
  }
  

  

  // get userName() {
  //   let userData = localStorage.getItem('user');
  //   if (userData) {
  //     return JSON.parse(userData).name;
  //   }
  //   return null;
  // }

  // get userName() {
  //   return localStorage.getItem('userName'); // Giả sử bạn đã lưu tên người dùng trong localStorage

  // }

  // Lưu thông tin người dùng khi đăng nhập thành công
  

  getUserName(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).name : null;
  }

  // getUserName(): string | null {
  //   return localStorage.getItem('userName');  // Lấy tên người dùng từ localStorage
  // }

  // get isLoggedIn() {
  //   return localStorage.getItem('token') ? true : false;  // Kiểm tra token để xác định đã đăng nhập
  // }
  
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  
  //thuhun comment
  // get isLoggedIn() {
  //   if (typeof window !== 'undefined') {
  //     let token = localStorage.getItem('token');
  //     return token ? true : false;
  //   }
  //   return false; 
  // }

  // logout() {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('userName');
  // }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/']); 
  }

  // Lưu thông tin người dùng và token khi đăng nhập thành công
  saveUserData(user: any, token: string) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  }



  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user && user.role === 'admin';
  }
}
