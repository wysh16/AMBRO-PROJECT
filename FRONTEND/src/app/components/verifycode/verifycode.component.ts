import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verifycode',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verifycode.component.html',
  styleUrls: ['./verifycode.component.css']
})


export class VerifycodeComponent implements OnInit{
  verificationForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize the form
    this.verificationForm = this.fb.group({
      verificationCode: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  verifyCode() {
    if (this.verificationForm.invalid) {
      this.errorMessage = 'Vui lòng nhập mã xác minh hợp lệ.';
      return;
    }

    const code = this.verificationForm.value.verificationCode;

    // Call verifyCode API
    this.authService.verifyCode(code).subscribe({
      next: () => {
        this.successMessage = 'Mã xác minh chính xác!';
        setTimeout(() => {
          this.router.navigate(['/reset-password']); // Navigate to reset password page
        }, 2000);
      },
      error: (err: any) => {
        this.errorMessage = 'Mã xác minh không hợp lệ hoặc đã hết hạn.';
      },
    });
  }
}
