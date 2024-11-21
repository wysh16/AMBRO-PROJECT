import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = 'http://localhost:3000/customers/save'; // Địa chỉ backend của bạn

  constructor(private http: HttpClient) {}

  // Phương thức để gửi dữ liệu khách hàng tới server
  saveCustomer(customerData: any) {
    return this.http.post(this.apiUrl, customerData);
  }
}
