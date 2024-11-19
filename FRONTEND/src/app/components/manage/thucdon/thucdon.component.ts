import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { MealService } from '../../../services/meal.service';
import { Meal } from '../../../types/meal';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-thucdon',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './thucdon.component.html',
  styleUrl: './thucdon.component.css',
})
export class ThucdonComponent {
  displayedColumns: string[] = [
    'mealName',
    'mealType',
    'mealCalories',
    'action',
  ];
  dataSource = new MatTableDataSource<Meal>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private mealService: MealService, private router: Router) {}

  ngOnInit() {
    this.fetchMeals();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchMeals() {
    this.mealService.getAllMeals().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  deleteMeal(id: string) {
    if (confirm('Bạn có chắc muốn xóa thực đơn này?')) {
      this.mealService.deleteMeal(id).subscribe(() => {
        alert('Thực đơn đã được xóa!');
        this.fetchMeals();
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editMeal(id: string): void {
    this.router.navigate([`/admin/thucdons/${id}`]);
  }

  addMeal(): void {
    this.router.navigate(['/admin/thucdons/add']);
  }
}
