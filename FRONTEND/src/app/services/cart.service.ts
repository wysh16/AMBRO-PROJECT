import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:3000/cart';
  private cartDetailsUrl = 'http://localhost:3000/cart-details';

  constructor(private http: HttpClient) {}

  getCartItems(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getCartDetails(userId: string): Observable<any> {
    return this.http.get<any>(`${this.cartDetailsUrl}?userId=${userId}`);
  }


  // Cập nhật trạng thái selected của một sản phẩm
  updateSelectedStatus(productId: string, selected: boolean): Observable<any> {
    const body = { selected }; // Truyền selected trong body request
    return this.http.patch<any>(`${this.apiUrl}/${productId}`, body);
  }

  // Lấy danh sách sản phẩm đã chọn (selected: true)
  getSelectedItems(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/selected`);
  }

  addToCart(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, {
      productId: product._id,
      quantity: 1,
    });
  }

  updateCartItem(productId: string, quantity: number): Observable<any> {
    const body = { productId, quantity };
    return this.http.put<any>(`${this.apiUrl}/update`, body);
  }

  removeFromCart(productId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${productId}`);
  }

  removeSelectedItems(productIds: string[]): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/remove-selected`, {
      body: { productIds },
    });
  }
}
