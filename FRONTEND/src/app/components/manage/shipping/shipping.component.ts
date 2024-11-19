import { Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ShippingService } from '../../../services/shipping.service';
import { Router } from '@angular/router';
import { Shipping } from '../../../types/shipping';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-shipping',
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
  templateUrl: './shipping.component.html',
  styleUrl: './shipping.component.css',
})
export class ShippingComponent {
  displayedColumns: string[] = [
    'ID_Donhang',
    'TenKhachHang',
    'PhuongThucVanChuyen',
    'TinhTrang',
    'action',
  ];
  dataSource = new MatTableDataSource<Shipping>([]);
  editingShipping: Shipping | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private shippingService = inject(ShippingService);
  private router = inject(Router);

  ngOnInit() {
    this.fetchShippings();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchShippings() {
    this.shippingService.getAllShippings().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  deleteShipping(id: string) {
    if (confirm('Bạn có chắc muốn xóa đơn hàng này?')) {
      this.shippingService.deleteShipping(id).subscribe(() => {
        alert('Đơn hàng đã được xóa!');
        this.fetchShippings();
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
