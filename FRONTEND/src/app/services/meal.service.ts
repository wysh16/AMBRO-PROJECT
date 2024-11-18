import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private apiUrl = 'http://localhost:3000/meal'; // Địa chỉ API của bạn
  private mealUrl = 'http://localhost:3000/meal-plan'; // Địa chỉ API của bạn


  
  constructor(private http: HttpClient) {}

  // Hàm để lấy danh sách mealIngredients
  getMealIngredients(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/ingredients`);
  }
 
  createMealPlan(mealPlanRequest: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/meal-plan`, mealPlanRequest);
  }

  // Lấy thực đơn đã được xây dựng (ví dụ từ local storage hoặc dịch vụ)
  getMealPlan(): any[] {
    // Trả về thực đơn đã lưu trước đó (nếu có) hoặc có thể gọi lại API nếu cần
    return JSON.parse(localStorage.getItem('mealPlan') || '[]');
  }

  // Lưu thực đơn vào local storage (hoặc có thể lưu ở nơi khác)
  setMealPlan(mealPlan: any[]): void {
    localStorage.setItem('mealPlan', JSON.stringify(mealPlan));
  }
}