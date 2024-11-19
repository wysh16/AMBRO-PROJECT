import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  private currentUser = new BehaviorSubject<string | null>(this.getUserName());
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());
  currentUser$ = this.currentUser.asObservable();
  loggedIn$ = this.loggedIn.asObservable();
  // http = inject(HttpClient);

  register(name: string, email: string, password: string) {
    return this.http.post(environment.apiUrl + '/auth/register', {
      name,
      email,
      password,
    });
  }

  forgotPassword(email: string) {
    return this.http.post(environment.apiUrl + '/auth/forgot-password', {
      email,
    });
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
    return this.http
      .post(environment.apiUrl + '/auth/login', { email, password })
      .pipe(
        tap((response: any) => {
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('token', response.token);
          this.router.navigate(['/']);

          // Cập nhật trạng thái đăng nhập
          this.loggedIn.next(true);
          this.currentUser.next(response.user.name);
        }),
        catchError((error) => {
          return throwError(() => error.error.message || 'Đăng nhập thất bại');
        })
      );
  }

  getUserName(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).name : null;
  }

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

    // Cập nhật trạng thái đăng xuất
    this.loggedIn.next(false);
    this.currentUser.next(null);
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
