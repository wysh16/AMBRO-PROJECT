import { Component, OnInit } from '@angular/core';
import { CongdongService } from '../../../services/congdong.service';
import { HoatDong, User } from '../../../types/congdong';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-congdong',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    CommonModule,
    FormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './congdong.component.html',
  styleUrl: './congdong.component.css',
})
export class CongdongComponent implements OnInit {
  displayedColumnsHoatDong: string[] = ['id', 'name', 'title', 'action'];
  displayedColumnsUser: string[] = [
    'id',
    'name',
    'posts',
    'comments',
    'likes',
    'status',
  ];

  dataSourceHoatDong: MatTableDataSource<HoatDong> =
    new MatTableDataSource<HoatDong>();
  dataSourceUser: MatTableDataSource<User> = new MatTableDataSource<User>();

  constructor(
    private congdongService: CongdongService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getHoatDong();
    this.getUsers();
  }

  // Lấy danh sách hoạt động
  // getHoatDong(): void {
  //   this.congdongService.getAllHoatDong().subscribe((data) => {
  //     this.dataSourceHoatDong = new MatTableDataSource(data);
  //   });
  // }

  // Lấy danh sách người dùng
  // getUsers(): void {
  //   this.congdongService.getAllUsers().subscribe((data) => {
  //     this.dataSourceUser = new MatTableDataSource(data);
  //   });
  // }

  getHoatDong(): void {
    this.congdongService.getAllHoatDong().subscribe((data) => {
      this.dataSourceHoatDong = new MatTableDataSource(data);
    });
  }

  getUsers(): void {
    this.congdongService.getAllUsers().subscribe((data) => {
      this.dataSourceUser = new MatTableDataSource(data);
    });
  }

  // Áp dụng bộ lọc cho bảng hoạt động
  applyFilterHoatDong(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceHoatDong.filter = filterValue.trim().toLowerCase();
  }

  // Áp dụng bộ lọc cho bảng người dùng
  applyFilterUser(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceUser.filter = filterValue.trim().toLowerCase();
  }

  // Xóa hoạt động
  deleteHoatDong(id: number): void {
    this.congdongService.deleteHoatDong(id).subscribe(() => {
      this.dataSourceHoatDong.data = this.dataSourceHoatDong.data.filter(
        (item) => item.ID !== id
      );
    });
  }
}
