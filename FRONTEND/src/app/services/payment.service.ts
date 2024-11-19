import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development'; // Đảm bảo đường dẫn đúng

import { ThanhToan } from '../types/thanhtoan';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = `${environment.apiUrl}/payments`; // Đường dẫn API cho thanh toán

  // Phương thức xác nhận thanh toán
  confirmPayment(orderDetails: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, orderDetails);
  }

  private baseUrl = `${environment.apiUrl}/thanhToan`;

  constructor(private http: HttpClient) {}

  // Lấy danh sách thanh toán
  getAllThanhToan(): Observable<ThanhToan[]> {
    return this.http.get<ThanhToan[]>(this.baseUrl);
  }

  // Lấy chi tiết thanh toán theo ID
  getThanhToanById(id: string): Observable<ThanhToan> {
    return this.http.get<ThanhToan>(`${this.baseUrl}/${id}`);
  }

  // Thêm mới thanh toán
  addThanhToan(thanhToan: ThanhToan): Observable<ThanhToan> {
    return this.http.post<ThanhToan>(this.baseUrl, thanhToan);
  }

  // Cập nhật tình trạng thanh toán
  updateThanhToan(id: string, thanhToan: ThanhToan): Observable<ThanhToan> {
    return this.http.put<ThanhToan>(`${this.baseUrl}/${id}`, thanhToan);
  }

  // Xóa thanh toán
  deleteThanhToan(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
