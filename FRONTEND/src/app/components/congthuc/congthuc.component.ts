import { Component, inject, OnInit } from '@angular/core';
import { CongthucService } from '../../services/congthuc.service';
import { CongThuc } from '../../types/congthuc';

import { CommonModule } from '@angular/common';

import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-congthuc',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './congthuc.component.html',
  styleUrl: './congthuc.component.css',
})
export class CongthucComponent implements OnInit {
  CongThucService = inject(CongthucService);
  CongThucList: CongThuc[] = [];
  filteredCongThucList: CongThuc[] = [];
  selectedCongThuc: CongThuc | null = null;
  searchQuery: string = '';

  // constructor(private sanitizer: DomSanitizer) {}
  constructor(private _service: CongthucService, private router: Router) {}

  ngOnInit() {
    this.CongThucService.getAllCongThuc().subscribe((result) => {
      this.CongThucList = result;
    });
    this.filteredCongThucList = [...this.CongThucList];
  }

  onSearch() {
    const query = this.searchQuery.trim().toLowerCase();
    if (query) {
      this.filteredCongThucList = this.CongThucList.filter((congthuc) =>
        congthuc.name.toLowerCase().includes(query)
      );
    } else {
      this.filteredCongThucList = [...this.CongThucList];
    }
  }

  selectCongThuc(congthuc: CongThuc) {
    this.selectedCongThuc = congthuc;
    this.searchQuery = congthuc.name ? String(congthuc.name) : '';
    this.filteredCongThucList = [];
    // Điều hướng đến chi tiết công thức
    this.router.navigate(['/congthuc', congthuc._id]);
  }
}
