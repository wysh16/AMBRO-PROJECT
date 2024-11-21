import { Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { PaymentService } from '../../../services/payment.service';
import { Router } from '@angular/router';
import { ThanhToan } from '../../../types/thanhtoan';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-thanhtoan',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './thanhtoan.component.html',
  styleUrl: './thanhtoan.component.css',
})
export class ThanhtoanComponent {
  displayedColumns: string[] = [
    'ID_Donhang',
    'TenKhachHang',
    'TinhTrangThanhToan',
    'action',
  ];
  dataSource = new MatTableDataSource<ThanhToan>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private thanhToanService = inject(PaymentService);
  private router = inject(Router);

  ngOnInit() {
    this.fetchThanhToan();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchThanhToan() {
    this.thanhToanService.getAllThanhToan().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  deleteThanhToan(id: string) {
    if (confirm('Bạn có chắc muốn xóa thông tin thanh toán này?')) {
      this.thanhToanService.deleteThanhToan(id).subscribe(() => {
        alert('Thông tin thanh toán đã được xóa!');
        this.fetchThanhToan();
      });
    }
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();

    this.dataSource.filterPredicate = (data: any, filter: string) => {
      // Lọc theo tình trạng thanh toán
      return (
        data.TinhTrangThanhToan.toLowerCase().includes(filter) ||
        data.TenKhachHang.toLowerCase().includes(filter) ||
        data.ID_Donhang.toLowerCase().includes(filter)
      );
    };

    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'Giao dịch thành công':
        return 'success-status';
      case 'Chưa thanh toán':
        return 'pending-status';
      default:
        return '';
    }
  }
}
