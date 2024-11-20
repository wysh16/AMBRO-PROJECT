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
import { KhuyenmaiService } from '../../../services/khuyenmai.service';
import { KhuyenMai } from '../../../types/khuyenmai';
import { MatLabel } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-khuyenmais-form',
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
  templateUrl: './khuyenmais-form.component.html',
  styleUrl: './khuyenmais-form.component.css',
})
export class KhuyenmaisFormComponent {
  formBuilder = inject(FormBuilder);
  khuyenMaiForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(6)]],
    title: ['', [Validators.required, Validators.minLength(6)]],
    description: ['', [Validators.required]],
    reasons_to_join: ['', [Validators.required]],
    promotion_details: this.formBuilder.array([]),
    voucher_code: ['', [Validators.required]],
    benefits: this.formBuilder.array([]),
    note: ['', [Validators.required]],
    banner: ['', [Validators.required]],
    voucher: ['', [Validators.required]],
    time: ['', [Validators.required]],
  });

  router = inject(Router);
  khuyenMaiService = inject(KhuyenmaiService);
  route = inject(ActivatedRoute);
  id!: string; // ID từ route

  ngOnInit() {
    this.id = this.route.snapshot.params['id']; // Lấy ID từ route
    if (this.id) {
      // Nạp khuyến mãi hiện có
      this.khuyenMaiService
        .getPromotionById(this.id)
        .subscribe((result: KhuyenMai) => {
          this.khuyenMaiForm.patchValue(result);
          result.promotion_details.forEach(() => this.addPromotionDetail());
          result.benefits.forEach(() => this.addBenefit());
        });
    } else {
      // Khởi tạo mảng trống cho form mới
      this.addPromotionDetail();
      this.addBenefit();
    }
  }

  // Lấy danh sách promotion_details
  get promotionDetails() {
    return this.khuyenMaiForm.get('promotion_details') as FormArray;
  }

  addPromotionDetail() {
    this.promotionDetails.push(
      this.formBuilder.control('', Validators.required)
    );
  }

  removePromotionDetail(index: number) {
    this.promotionDetails.removeAt(index);
  }

  // Lấy danh sách benefits
  get benefits() {
    return this.khuyenMaiForm.get('benefits') as FormArray;
  }

  addBenefit() {
    this.benefits.push(this.formBuilder.control('', Validators.required));
  }

  removeBenefit(index: number) {
    this.benefits.removeAt(index);
  }

  // Thêm khuyến mãi
  addKhuyenMai() {
    if (this.khuyenMaiForm.valid) {
      const newPromotion = this.khuyenMaiForm.value as KhuyenMai;
      this.khuyenMaiService.addPromotion(newPromotion).subscribe(() => {
        alert('Khuyến mãi mới đã được thêm thành công!');
        this.router.navigateByUrl('/admin/khuyenmais');
      });
    }
  }

  // Cập nhật khuyến mãi
  updateKhuyenMai() {
    if (this.khuyenMaiForm.valid && this.id) {
      const updatedPromotion = this.khuyenMaiForm.value as KhuyenMai;
      this.khuyenMaiService
        .updatePromotion(this.id, updatedPromotion)
        .subscribe(() => {
          alert('Khuyến mãi đã được cập nhật thành công!');
          this.router.navigateByUrl('/admin/khuyenmais');
        });
    }
  }

  // Hủy và quay lại danh sách
  cancel() {
    this.router.navigateByUrl('/admin/khuyenmais');
  }
}
