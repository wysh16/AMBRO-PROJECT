import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shipping } from '../types/shipping';

@Injectable({
  providedIn: 'root',
})
export class ShippingService {
  private apiUrl = 'http://localhost:3000/shippings'; // Đường dẫn đến API

  constructor(private http: HttpClient) {}

  // Lấy danh sách tất cả vận chuyển
  getAllShippings(): Observable<Shipping[]> {
    return this.http.get<Shipping[]>(this.apiUrl);
  }

  // Lấy thông tin vận chuyển theo ID
  getShippingById(id: string): Observable<Shipping> {
    return this.http.get<Shipping>(`${this.apiUrl}/${id}`);
  }

  // Tạo mới vận chuyển
  createShipping(shipping: Shipping): Observable<Shipping> {
    return this.http.post<Shipping>(this.apiUrl, shipping);
  }

  // Cập nhật vận chuyển
  updateShipping(id: string, shipping: Shipping): Observable<Shipping> {
    return this.http.put<Shipping>(`${this.apiUrl}/${id}`, shipping);
  }

  // Xóa vận chuyển
  deleteShipping(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
