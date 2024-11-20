import { Component, OnInit } from '@angular/core';
import { MealService } from '../../services/meal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-meal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meal.component.html',
  styleUrl: './meal.component.css'
})
export class MealComponent implements OnInit{
  mealPlan: any[] = [];

  constructor(private mealService: MealService) {}

 
  
  ngOnInit(): void {
    // Nhận kết quả thực đơn từ MealService (đã lưu trước đó)
    this.mealPlan = this.mealService.getMealPlan();
  }
  calculateTotalCalories(day: any): number {
    return (
      day.breakfast.mealCalories +
      day.lunch.mealCalories +
      day.dinner.mealCalories
    );
  }
}

