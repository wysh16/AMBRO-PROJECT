import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent 
implements OnInit
{
  errorMessage: string = '';
  successMessage: string = '';
  token: string = '';
  resetPasswordForm!: FormGroup; 
  

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.token = this.route.snapshot.queryParams['token'] || '';
  }

  ngOnInit(): void {
    // Khởi tạo form trong ngOnInit
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }



  get passwordControl() {
    return this.resetPasswordForm.get('password');
  }
  
  get confirmPasswordControl() {
    return this.resetPasswordForm.get('confirmPassword');
  }
  


  
  // updatePassword() {
  //   const newPassword = this.resetPasswordForm.value.newPassword!;
  //   this.authService.resetPassword(this.token, newPassword).subscribe({
  //     next: () => {
  //       this.successMessage = 'Mật khẩu đã được cập nhật!';
  //     },
  //     error: (err) => {
  //       this.errorMessage = 'Cập nhật mật khẩu thất bại!';
  //     },
  //   });
  // }

  updatePassword() {
    if (this.resetPasswordForm.invalid) {
      this.errorMessage = 'Vui lòng nhập thông tin hợp lệ.';
      return;
    }
  
    const { password, confirmPassword } = this.resetPasswordForm.value;
    if (password !== confirmPassword) {
      this.errorMessage = 'Mật khẩu xác nhận không khớp.';
      return;
    }
  
    this.authService.resetPassword(this.token, password).subscribe({
      next: () => {
        this.successMessage = 'Mật khẩu đã được cập nhật!';
      },
      error: (err) => {
        this.errorMessage = 'Cập nhật mật khẩu thất bại!';
      },
    });
  }
  
}