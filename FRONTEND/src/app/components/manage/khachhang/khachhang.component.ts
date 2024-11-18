import { Component, inject, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { KhachhangService } from '../../../services/khachhang.service';
import { KhachHang } from '../../../types/khachhang';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-khachhang',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './khachhang.component.html',
  styleUrl: './khachhang.component.css',
})
export class KhachhangComponent {
  dataSource: MatTableDataSource<KhachHang>;
  displayedColumns: string[] = [
    'id',
    'fullName',
    'phone',
    'email',
    'address',
    'bankAccount',
    'action',
    'status',
  ];

  constructor() {
    this.dataSource = new MatTableDataSource<KhachHang>([]); // Sử dụng kiểu `KhachHang`
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  khachHangService = inject(KhachhangService);

  ngOnInit() {
    this.getKhachHangData();
  }

  private getKhachHangData() {
    this.khachHangService.getAllKhachHang().subscribe((result) => {
      this.dataSource.data = result;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(id: string) {
    if (confirm('Bạn có chắc chắn muốn xóa khách hàng này?')) {
      this.khachHangService.deleteKhachHang(id).subscribe(() => {
        alert('Khách hàng đã được xóa thành công.');
        this.getKhachHangData();
      });
    }
  }
}
