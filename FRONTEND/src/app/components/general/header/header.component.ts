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
  searchTerm: string='';

  // constructor(
  //   private productService: ProductService,
  //   private router1: Router
  // ) {}

  // ngOnInit(): void {
  //   this.loadCategories();
  //   this.loadProducts();
  // }

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loadCategories(); // Tải danh mục sản phẩm
    this.loadProducts(); // Tải sản phẩm
    // this.isLoggedIn = this.authService.isLoggedIn();
    // this.userName = this.authService.getUserName();

    // Lắng nghe trạng thái đăng nhập và tên người dùng
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
    this.router.navigate(['/']); // Chuyển hướng về trang chủ
  }


  // logout() {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('user');
  //   this.userName = null;  // Cập nhật lại userName để giao diện phản ánh trạng thái đăng xuất
  //   this.router.navigate(['/']);  // Điều hướng về trang chủ
  // }

  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
        this.filterProductsByCategory(this.selectedCategory); // Áp dụng lọc theo danh mục đã chọn
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
    this.selectedCategory = category;

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

  menuActive = false;

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  navigateToProducts(category: string) {
    this.filterProductsByCategory(category); // Lọc sản phẩm theo danh mục đã chọn
    this.router.navigate(['/products', { category: category }]);
  }

  // authService = inject(AuthService);
  // router = inject(Router);
  //   logout() {
  //     this.authService.logout();
  //     this.router.navigateByUrl('/login');
  //   }

  // userName: string | null = null; // Lưu tên người dùng -- thuhun comment

  // constructor(private authService: AuthService, private router: Router) {}

  // ngOnInit(): void {
  //   this.checkUserStatus();
  // }

  // Kiểm tra trạng thái đăng nhập--thuhun comment
  // checkUserStatus() {
  //   if (typeof window !== 'undefined' && this.authService.isLoggedIn) {
  //     this.userName = this.authService.userName; // Lấy tên người dùng từ AuthService
  //   }
  // }

  // Xử lý đăng xuất--thuhun comment
  // logout() {
  //   this.authService.logout(); // Xóa token và thông tin người dùng
  //   this.userName = null; // Reset tên người dùng
  //   this.router1.navigate(['/login']); // Điều hướng về trang đăng nhập
  // }
}
