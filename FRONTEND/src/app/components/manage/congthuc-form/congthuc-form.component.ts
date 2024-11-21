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
import { DanhMucCongThuc } from '../../../types/danhMucCongThuc';
import { DanhMucCongThucService } from '../../../services/danhmucongthuc.service';
import { CongthucService } from '../../../services/congthuc.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-congthuc-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './congthuc-form.component.html',
  styleUrl: './congthuc-form.component.css',
})
export class CongthucFormComponent {
  private formBuilder = inject(FormBuilder);
  private danhmucService = inject(DanhMucCongThucService);
  private congThucService = inject(CongthucService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // Form definition
  CongThucForm = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(6)]],
    datePosted: [null, [Validators.required]],
    estimatedTime: [null, [Validators.required, Validators.min(1)]],
    imageUrl: [null, [Validators.required]], // Single image URL
    DanhMucId: [null, [Validators.required]],
  });
  categories: DanhMucCongThuc[] = [];
  id!: string;

  ngOnInit() {
    // Load recipe data if editing
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.congThucService.getCongThuc(this.id).subscribe((result) => {
        this.CongThucForm.patchValue(result as any);
      });
    }
  }

  // Add a new recipe
  addCongThuc() {
    if (this.CongThucForm.valid) {
      const value = this.CongThucForm.value;
      this.congThucService.addCongThuc(value as any).subscribe(() => {
        alert('Công thức đã được thêm thành công!');
        this.router.navigateByUrl('/admin/congthucs');
      });
    } else {
      alert('Vui lòng kiểm tra lại thông tin.');
    }
  }

  updateCongThuc() {
    if (this.CongThucForm.valid) {
      const value = this.CongThucForm.value;
      this.congThucService
        .updateCongThuc(this.id, value as any)
        .subscribe(() => {
          alert('Công thức đã được cập nhật!');
          this.router.navigateByUrl('/admin/congthucs');
        });
    } else {
      alert('Vui lòng kiểm tra lại thông tin.');
    }
  }

  // Hủy và quay lại danh sách
  cancel() {
    this.router.navigateByUrl('/admin/congthucs');
  }
}
