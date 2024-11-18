import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: any; // Khai báo ở đây
  errorMessage: string = '';
  successMessage: string = '';

  // Constructor không thay đổi
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  // Khởi tạo form trong ngOnInit
  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  sendResetLink() {
    const email = this.forgotPasswordForm.value.email!;
    this.authService.forgotPassword(email).subscribe({
      next: (response) => {
        this.successMessage = 'Link đặt lại mật khẩu đã được gửi!';
      },
      error: (err) => {
        this.errorMessage = 'Đã xảy ra lỗi, vui lòng thử lại!';
      },
    });
  }
}
