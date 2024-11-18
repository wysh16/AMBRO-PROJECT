import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { KhachHang } from '../types/khachhang';

@Injectable({
  providedIn: 'root',
})
export class KhachhangService {
  private baseUrl = `${environment.apiUrl}/khachhangs`;

  constructor(private http: HttpClient) {}

  getAllKhachHang() {
    return this.http.get<KhachHang[]>(this.baseUrl);
  }

  getKhachHang(id: string) {
    return this.http.get<KhachHang>(`${this.baseUrl}/${id}`);
  }

  addKhachHang(model: KhachHang) {
    return this.http.post(this.baseUrl, model);
  }

  updateKhachHang(id: string, model: KhachHang) {
    return this.http.put(`${this.baseUrl}/${id}`, model);
  }

  deleteKhachHang(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
