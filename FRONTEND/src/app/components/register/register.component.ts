import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent{
  formbuilder = inject(FormBuilder);
  registerForm = this.formbuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.minLength(5)]],
  });

  authService = inject(AuthService);

  router = inject(Router);

  register() {
    let value = this.registerForm.value;
    this.authService
      .register(value.name!, value.email!, value.password!)
      .subscribe((result) => {
        alert('Đăng kí thành công');
        this.router.navigateByUrl('login');
      });
  }
 
}
