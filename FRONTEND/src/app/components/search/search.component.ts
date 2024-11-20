import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{

  searchTerm: string = '';
  products: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchTerm = params['search'] || '';
      if (this.searchTerm) {
        this.loadSearchResults();
      }
    });
  }

  loadSearchResults(): void {
    this.productService.searchProducts(this.searchTerm).subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => console.error('Lỗi khi tải sản phẩm', err),
    });
  }
  viewProductDetail(productId: string) {
    this.router.navigate(['/products', productId]);
  }

  addToCart(product: any) {
    this.cartService.addToCart(product).subscribe({
      next: (response) => {
        alert('Sản phẩm đã được thêm vào giỏ hàng');
      },
      error: (err) => {
        alert('Lỗi khi thêm sản phẩm vào giỏ hàng');
        console.error('Error adding to cart:', err);
      },
    });
  }

  addToFavorites(product: any) {
    // Logic thêm vào yêu thích
  }

  
}
