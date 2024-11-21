import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  CarouselComponent,
  CarouselModule,
  CarouselSlideDirective,
} from 'ngx-owl-carousel-o';
import { HotProduct } from '../../types/hotProduct';
import { NewProduct } from '../../types/newProduct';
import { ProductService } from '../../services/product.service';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CarouselModule, RouterModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  product: any = [];
  hotProducts: any[] = []; // Lưu danh sách sản phẩm
  newProducts: any[] = []; // Sản phẩm mới
  currentIndex: number = 0;
  currentIndexNew: number = 0; // Chỉ số hiện tại cho sản phẩm mới
  itemsPerPage: number = 3;

  private routeSub: Subscription | undefined;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Lấy danh sách sản phẩm hot
    this.productService.getHotProducts().subscribe({
      next: (data) => {
        this.hotProducts = data;
      },
      error: (err) => {
        console.error('Error loading hot products:', err);
      },
    });

    this.routeSub = this.route.params.subscribe((params) => {
      const productId = params['id'];
      if (productId) {
        this.loadProductById(productId);
      }
    });

    // Lấy danh sách sản phẩm mới
    this.productService.getNewProducts().subscribe({
      next: (data) => {
        this.newProducts = data;
      },
      error: (err) => {
        console.error('Error loading new products:', err);
      },
    });
  }

  // Hiển thị sản phẩm mới
  get displayedNewProducts() {
    return this.newProducts.slice(
      this.currentIndexNew,
      this.currentIndexNew + this.itemsPerPage
    );
  }
  get displayedProducts() {
    return this.hotProducts.slice(
      this.currentIndex,
      this.currentIndex + this.itemsPerPage
    );
  }
  loadProductById(productId: string) {
    this.productService.getProductById(productId).subscribe((data) => {
      this.product = data;
    });
  }

  nextProducts() {
    const totalProducts = this.hotProducts.length;
    if (this.currentIndex + 1 < totalProducts) {
      this.currentIndex++; // Chỉ lướt 1 sản phẩm mỗi lần
    }
  }

  previousProducts() {
    if (this.currentIndex - 1 >= 0) {
      this.currentIndex--; // Quay lại 1 sản phẩm mỗi lần
    }
  }

  // Chuyển sang sản phẩm mới tiếp theo
  nextNewProducts() {
    if (this.currentIndexNew + this.itemsPerPage < this.newProducts.length) {
      this.currentIndexNew += this.itemsPerPage;
    }
  }

  // Quay lại sản phẩm mới trước đó
  previousNewProducts() {
    if (this.currentIndexNew - this.itemsPerPage >= 0) {
      this.currentIndexNew -= this.itemsPerPage;
    }
  }

  viewProductDetail(productId: string) {
    this.router.navigate(['/products', productId]);
  }
}
