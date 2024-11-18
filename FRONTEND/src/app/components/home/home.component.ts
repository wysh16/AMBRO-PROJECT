import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HomeService } from '../../services/home.service';
import { ProductService } from '../../services/product.service';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CarouselModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  // newProducts: any[] = [];
  // topSellerProducts: any[] = [];
  // constructor(private productService: ProductService) {}
  // ngOnInit() {
  //   this.loadNewProducts();
  //   this.loadTopSellerProducts();
  // }
  // loadNewProducts() {
  //   this.productService.getProductsByLabel('New').subscribe((data) => {
  //     this.newProducts = data;
  //   });
  // }
  // loadTopSellerProducts() {
  //   this.productService.getProductsByLabel('Hot').subscribe((data) => {
  //     this.topSellerProducts = data;
  //   });
  // }
}
