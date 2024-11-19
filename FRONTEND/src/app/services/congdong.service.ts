import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HoatDong, User } from '../types/congdong';

@Injectable({
  providedIn: 'root',
})
export class CongdongService {
  private baseUrl = 'http://localhost:3000/baiviets';

  private apiUrl = 'http://localhost:3000/nguoidungs';

  constructor(private http: HttpClient) {}

  // Lấy tất cả hoạt động
  getAllHoatDong(): Observable<HoatDong[]> {
    return this.http.get<HoatDong[]>(`${this.baseUrl}`);
  }

  // Lấy tất cả người dùng
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }

  // Xóa hoạt động
  deleteHoatDong(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
