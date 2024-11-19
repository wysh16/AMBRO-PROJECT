import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DonhangService } from '../../../services/donhang.service';
import { Order } from '../../../types/donhang';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-donhangs',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './donhangs.component.html',
  styleUrl: './donhangs.component.css',
})
export class DonhangsComponent {
  displayedColumns: string[] = ['id', 'customerId', 'status', 'action'];
  dataSource: MatTableDataSource<Order>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  orderService = inject(DonhangService);

  constructor() {
    this.dataSource = new MatTableDataSource([] as any);
  }

  ngOnInit() {
    this.getServerData();
  }

  private getServerData() {
    this.orderService.getAllOrders().subscribe((result) => {
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
    this.orderService.deleteOrder(id).subscribe(() => {
      alert('Đơn hàng đã được xóa');
      this.getServerData();
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Đã vận chuyển':
        return 'status-shipped';
      case 'Đã giao hàng':
        return 'status-delivered';
      case 'Đã hủy':
        return 'status-canceled';
      case 'Đã trả lại':
        return 'status-returned';
      default:
        return 'status-default';
    }
  }
}
