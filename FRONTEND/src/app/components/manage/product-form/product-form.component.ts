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
  // formBuilder = inject(FormBuilder);
  // productForm = this.formBuilder.group({
  //   name: [null, [Validators.required, Validators.minLength(5)]],
  //   shortDescription: [null, [Validators.required, Validators.minLength(10)]],
  //   description: [null, [Validators.required, Validators.minLength(50)]],
  //   price: [null, [Validators.required]],
  //   discount: [],
  //   images: this.formBuilder.array([]),
  //   categoryId: [null, [Validators.required]],
  // });

  // categoryService = inject(CategoryService);
  // categories: Category[] = [];
  // productService = inject(ProductService);
  // id!: string;
  // route = inject(ActivatedRoute);

  // ngOnInit() {
  //   this.categoryService.getCategories().subscribe((result) => {
  //     this.categories = result;
  //   });

  //   this.id = this.route.snapshot.params['id'];
  //   console.log(this.id);
  //   if (this.id) {
  //     this.productService.getAllProducts(this.id).subscribe((result) => {
  //       for (let index = 0; index < result.images.length; index++) {
  //         this.addImage();
  //       }
  //       this.productForm.patchValue(result as any);
  //     });
  //   } else {
  //     this.addImage();
  //   }
  // }

  // router = inject(Router);
  // addProduct() {
  //   let value = this.productForm.value;
  //   console.log(value);
  //   this.productService.addProduct(value as any).subscribe((result) => {
  //     alert('Product Added');
  //     this.router.navigateByUrl('/admin/products');
  //   });
  // }

  // updateProduct() {
  //   let value = this.productForm.value;
  //   console.log(value);
  //   this.productService
  //     .updateProduct(this.id, value as any)
  //     .subscribe((result) => {
  //       alert('Product Updated');
  //       this.router.navigateByUrl('/admin/products');
  //     });
  // }

  // addImage() {
  //   this.images.push(this.formBuilder.control(null));
  // }

  // removeImage() {
  //   this.images.removeAt(this.images.controls.length - 1);
  // }

  // get images() {
  //   return this.productForm.get('images') as FormArray;
  // }

  // Inject các service cần thiết
  formBuilder = inject(FormBuilder);
  categoryService = inject(CategoryService);
  productService = inject(ProductService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  // Khai báo form
  productForm: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(5)]],
    shortDescription: [null, [Validators.required, Validators.minLength(10)]],
    description: [null, [Validators.required, Validators.minLength(50)]],
    price: [null, [Validators.required, Validators.min(0)]],
    discount: [null, [Validators.min(0), Validators.max(100)]], // Thêm validation cho discount
    images: this.formBuilder.array([]),
    categoryId: [null, [Validators.required]],
  });

  categories: Category[] = [];
  id!: string;

  ngOnInit() {
    // Lấy danh sách categories
    this.categoryService.getCategories().subscribe((result) => {
      this.categories = result;
    });

    // Kiểm tra nếu là update
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.productService.getProductById(this.id).subscribe((result) => {
        // Tạo đủ số lượng control trong mảng images
        result.images.forEach(() => this.addImage());

        // Gán dữ liệu vào form
        this.productForm.patchValue(result as any);
      });
    } else {
      // Thêm sẵn một control ảnh nếu là thêm mới
      this.addImage();
    }
  }

  // Hàm thêm mới sản phẩm
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
    this.productService
      .updateProduct(this.id, productData as any)
      .subscribe(() => {
        alert('Sản phẩm đã được cập nhật!');
        this.router.navigateByUrl('/admin/products');
      });
  }

  // Hàm thêm ảnh vào FormArray
  addImage() {
    this.images.push(this.formBuilder.control(null, [Validators.required]));
  }

  // Hàm xóa ảnh khỏi FormArray
  removeImage() {
    if (this.images.length > 1) {
      this.images.removeAt(this.images.length - 1);
    } else {
      alert('Cần ít nhất một ảnh!');
    }
  }

  // Getter cho FormArray images
  get images() {
    return this.productForm.get('images') as FormArray;
  }

  // Hàm trackBy để cải thiện hiệu năng khi lặp qua danh mục
  trackByFn(index: number, item: any) {
    return item._id;
  }
}
