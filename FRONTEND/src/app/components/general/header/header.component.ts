import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { DanhMucCongThucService } from '../../../services/danhmucongthuc.service';
import { DanhMucCongThuc } from '../../../types/danhMucCongThuc';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  products: any = [];
  filteredProducts: any = [];
  newProducts: any = [];
  productCategories: string[] = [];
  errMsg: string = '';
  selectedCategory: string = 'Tất cả sản phẩm'; // Lưu danh mục đã chọn
  isDropdownOpen: boolean = false; // Biến để điều khiển dropdown
  userName: string | null = null;
  isLoggedIn: boolean = false;
  searchTerm: string = '';
  searchResults: any[] = [];

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
    this.authService.loggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });

    this.authService.currentUser$.subscribe((name) => {
      this.userName = name;
    });
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.userName = null;
    this.router.navigate(['/']);
  }

  searchProducts(): void {
    if (this.searchTerm.trim() === '') {
      this.searchResults = [];
      this.isDropdownOpen = false;
      return;
    }

    this.productService.searchProducts(this.searchTerm).subscribe({
      next: (data) => {
        this.searchResults = data;
        this.isDropdownOpen = true;
      },
      error: (err) => console.error('Lỗi khi tìm kiếm sản phẩm', err),
    });
  }

  onSearchEnter(): void {
    if (this.searchTerm.trim() !== '') {
      this.router.navigate(['/search-result'], {
        queryParams: { search: this.searchTerm },
      });
    }
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
        this.filterProductsByCategory(this.selectedCategory);
      },
      error: (err) => (this.errMsg = err),
    });
  }

  loadCategories() {
    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.productCategories = ['Tất cả sản phẩm', ...categories];
      },
      error: (err) => (this.errMsg = err),
    });
  }

  filterProductsByCategory(category: string) {
    this.filteredProducts = category;

    if (category === 'Tất cả sản phẩm') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(
        (product: any) => product.category === category
      );
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // menuActive = false;

  // toggleMenu() {
  //   this.menuActive = !this.menuActive;
  // }

  navigateToProducts(category: string) {
    this.filterProductsByCategory(category); // Lọc sản phẩm theo danh mục đã chọn
    this.router.navigate(['/products', { category: category }]);
  }
}
