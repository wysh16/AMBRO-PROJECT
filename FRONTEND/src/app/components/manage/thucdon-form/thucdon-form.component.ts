import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, ActivatedRoute } from '@angular/router';
import { MealService } from '../../../services/meal.service';
import { Meal } from '../../../types/meal';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-thucdon-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './thucdon-form.component.html',
  styleUrl: './thucdon-form.component.css',
})
export class ThucdonFormComponent {
  formBuilder = inject(FormBuilder);
  thucDonForm = this.formBuilder.group({
    mealType: ['', [Validators.required]], // Loại bữa
    mealName: ['', [Validators.required, Validators.minLength(3)]], // Tên món
    mealCalories: [0, [Validators.required, Validators.min(1)]], // Lượng calo
    mealIngredients: this.formBuilder.array([]), // Thành phần
    mealImage: ['', [Validators.required]], // Ảnh món
    mealRecipe: ['', [Validators.required]], // Công thức nấu ăn
  });

  router = inject(Router);
  thucdonService = inject(MealService);
  id!: string; // ID món ăn từ route
  route = inject(ActivatedRoute);

  ngOnInit() {
    this.id = this.route.snapshot.params['id']; // Lấy ID từ route
    if (this.id) {
      // Load món ăn hiện có
      this.thucdonService.getMealById(this.id).subscribe((result: Meal) => {
        this.thucDonForm.patchValue(result);
        // Populate ingredients
        result.mealIngredients.forEach(() => this.addIngredient());
      });
    } else {
      // Initialize empty ingredients for new form
      this.addIngredient();
    }
  }

  // Thành phần món ăn (array handling)
  get mealIngredients() {
    return this.thucDonForm.get('mealIngredients') as FormArray;
  }

  addIngredient() {
    this.mealIngredients.push(
      this.formBuilder.control('', Validators.required)
    );
  }

  removeIngredient(index: number) {
    this.mealIngredients.removeAt(index);
  }

  // Thêm món ăn mới
  addThucDon() {
    if (this.thucDonForm.valid) {
      const newMeal = this.thucDonForm.value as Meal;
      this.thucdonService.createMeal(newMeal).subscribe(() => {
        alert('Thực đơn mới đã được thêm thành công!');
        this.router.navigateByUrl('/admin/thucdon');
      });
    }
  }

  // Cập nhật món ăn hiện có
  updateThucDon() {
    if (this.thucDonForm.valid && this.id) {
      const updatedMeal = this.thucDonForm.value as Meal;
      this.thucdonService.updateMeal(this.id, updatedMeal).subscribe(() => {
        alert('Thực đơn đã được cập nhật thành công!');
        this.router.navigateByUrl('/admin/thucdon');
      });
    }
  }

  // Hủy và quay lại danh sách
  cancel() {
    this.router.navigateByUrl('/admin/thucdons');
  }
}
