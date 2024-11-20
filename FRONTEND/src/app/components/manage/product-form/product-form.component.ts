import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Category } from '../../../types/category';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {
  // Inject các dịch vụ
  private formBuilder = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // Form
  productForm: FormGroup = this.formBuilder.group({
    // Các thuộc tính đã có
    name: [null, [Validators.required, Validators.minLength(5)]],
    shortDescription: [null, [Validators.required, Validators.minLength(10)]],
    description: [null, [Validators.required, Validators.minLength(50)]],
    price: [null, [Validators.required, Validators.min(0)]],
    discount: [null, [Validators.min(0), Validators.max(100)]],
    images: this.formBuilder.array([]),
    categoryId: [null, [Validators.required]],

    // Các thuộc tính bổ sung dựa trên dữ liệu mẫu
    originalPrice: [null, [Validators.min(0)]],
    weight: [null, [Validators.min(0)]],
    rating: [null, [Validators.min(0), Validators.max(5)]], // Giả sử đánh giá từ 0 đến 5
    reviewCount: [0], // Mặc định là 0
    label: ['Normal'], // Mặc định là "Normal"
    techStandard: [''],
    nutriComposition: [''],
    nutriIndex: [''],
    usage: [''],
    usageInstruction: [''],
    storageInstruction: [''],
    note: [''],
    category: ['Các loại hạt dinh dưỡng, granola'], // Nếu category là một danh sách các tùy chọn, bạn có thể sử dụng FormControlName và cung cấp một danh sách các lựa chọn
  });
  // Dữ liệu
  categories: Category[] = [];
  id: string | null = null;

  // ngOnInit() {
  //   // Lấy danh sách danh mục
  //   this.categoryService.getCategories().subscribe((result) => {
  //     this.categories = result;
  //   });

  //   // Kiểm tra ID và tải chi tiết sản phẩm nếu cần
  //   this.id = this.route.snapshot.paramMap.get('id');
  //   if (this.id) {
  //     this.loadProductDetails(this.id);
  //   } else {
  //     this.addImage(); // Thêm ít nhất một ảnh nếu là sản phẩm mới
  //   }
  // }
  ngOnInit() {
    // Lấy ID từ route
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      // Load sản phẩm hiện có
      this.productService.getProductById(this.id).subscribe((result) => {
        // Cập nhật giá trị vào form
        this.productForm.patchValue(result);

        // Tạo các controls cho hình ảnh nếu có
        result.images.forEach(() => this.addImage());
      });
    } else {
      // Thêm ít nhất một ảnh nếu là sản phẩm mới
      this.addImage();
    }
  }
  // Hàm tải chi tiết sản phẩm
  loadProductDetails(id: string) {
    this.productService.getProductById(id).subscribe((result) => {
      // Tạo controls cho hình ảnh dựa trên dữ liệu
      result.images.forEach(() => this.addImage());
      // Gán giá trị vào form
      this.productForm.patchValue(result as any);
    });
  }

  // Hàm thêm sản phẩm
  addProduct() {
    const productData = this.productForm.value;
    this.productService.addProduct(productData as any).subscribe(() => {
      alert('Sản phẩm đã được thêm!');
      this.router.navigateByUrl('/admin/products');
    });
  }

  // Hàm cập nhật sản phẩm
  updateProduct() {
    const productData = this.productForm.value;
    if (!this.id) return;

    this.productService
      .updateProduct(this.id, productData as any)
      .subscribe(() => {
        alert('Sản phẩm đã được cập nhật!');
        this.router.navigateByUrl('/admin/products');
      });
  }

  // Thêm ảnh vào FormArray
  addImage() {
    this.images.push(this.formBuilder.control(null, [Validators.required]));
  }

  // Xóa ảnh khỏi FormArray
  removeImage() {
    if (this.images.length > 1) {
      this.images.removeAt(this.images.length - 1);
    } else {
      alert('Cần ít nhất một ảnh!');
    }
  }

  // Getter cho mảng images
  get images() {
    return this.productForm.get('images') as FormArray;
  }

  // Hàm trackBy để tăng hiệu suất
  trackByFn(index: number, item: any) {
    return item._id;
  }
}
