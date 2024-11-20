import { Component, HostListener } from '@angular/core'; 
import { Router } from '@angular/router';
import { TdeeService } from '../../services/tdee.service';
import { MealService } from '../../services/meal.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tdee-result',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tdee-result.component.html',
  styleUrl: './tdee-result.component.css'
})
export class TdeeResultComponent {

  BMR: number | null = null;
  TDEE: number | null = null;
  dailyCalories: number | null = null;
  goal: string = '';
  ingredients: string[] = [];
  filteredIngredients: string[] = [];
  searchTerm: string = '';
  selectedTags: string[] = [];
  showDropdown: boolean = false;
  days: number = 1; // Mặc định là 1 ngày
  mealPlan: any[] = [];

  constructor(
    private tdeeService: TdeeService,
    private mealService: MealService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const result = this.tdeeService.getResult();
    if (result) {
      this.BMR = result.BMR;
      this.TDEE = result.TDEE;
      this.dailyCalories = result.dailyCalories;
      this.goal = result.goal;
    }
    
    this.loadIngredients();
  }

  loadIngredients() {
    this.mealService.getMealIngredients().subscribe(
      (data) => {
        console.log('Ingredients:', data); // Thêm dòng log
        this.ingredients = data;
        this.filteredIngredients = data;
      },
      error => {
        console.error('Error fetching ingredients:', error);
      }
    );
  }

  filterIngredients() {
    const term = this.searchTerm.toLowerCase();
    this.filteredIngredients = this.ingredients.filter(ingredient => 
      ingredient.toLowerCase().includes(term)
    );
  }

  selectIngredient(ingredient: string) {
    if (!this.selectedTags.includes(ingredient)) {
      this.selectedTags.push(ingredient);
    }
    this.searchTerm = '';
    this.showDropdown = false;
    this.filterIngredients();
  }

  removeTag(tag: string) {
    this.selectedTags = this.selectedTags.filter((t) => t !== tag); // Xóa tag khỏi mảng
  }

  buildMealPlan() {
    if (!this.dailyCalories) {
      alert('Vui lòng nhập đầy đủ thông tin để tính TDEE.');
      return;
    }

    // Gửi yêu cầu lấy thực đơn
    const mealPlanRequest = {
      dailyCalories: this.dailyCalories,
      excludedIngredients: this.selectedTags,
      days: this.days,
    };

    this.mealService.createMealPlan(mealPlanRequest).subscribe(
      (response) => {
        // Lưu kết quả vào local storage hoặc service
        this.mealService.setMealPlan(response.mealPlan);
        // Điều hướng đến trang mới hiển thị thực đơn
        this.router.navigate(['/meal-plan']);
      },
      (error) => {
        console.error('Error creating meal plan:', error);
      }
    );
  }

  // Lắng nghe sự kiện click bên ngoài form
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;

    // Nếu không nhấn vào ô input hoặc dropdown thì ẩn dropdown
    const isClickedInside = clickedElement.closest('.tags-input-container');
    if (!isClickedInside) {
      this.showDropdown = false;
    }
  }
}
