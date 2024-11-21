import { Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CongthucService } from '../../../services/congthuc.service';
import { CongThuc } from '../../../types/congthuc';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-congthucs',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './congthucs.component.html',
  styleUrl: './congthucs.component.css',
})
export class CongthucsComponent {
  displayedColumns: string[] = [
    'ID_CongThuc',
    'name',
    'datePosted',
    'estimatedTime',
    'action',
  ];
  dataSource = new MatTableDataSource<CongThuc>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private congthucService: CongthucService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.fetchCongThucs();
    this.route.params.subscribe(() => {
      this.fetchCongThucs();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchCongThucs() {
    this.congthucService.getAllCongThuc().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  deleteCongThuc(id: string) {
    if (confirm('Bạn có chắc muốn xóa công thức này?')) {
      this.congthucService.deleteCongThuc(id).subscribe(() => {
        alert('Công thức đã được xóa!');
        this.fetchCongThucs();
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

  editCongThuc(id: string): void {
    this.router.navigate([`/admin/congthucs/${id}`]);
  }

  addCongThuc(): void {
    this.router.navigate(['/admin/congthucs/add']);
  }
}
