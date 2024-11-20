import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../../services/payment.service';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent implements OnInit {
  paymentMethod: 'card' | 'cod' = 'card';  
  totalSelectedAmount: number = 0; // Tổng tiền hàng (các sản phẩm được chọn)
  voucherValue: number = 0; // Giá trị của voucher
  totalAmountAfterVoucher: number = 0; // Tổng tiền sau khi áp dụng voucher
  totalAmount: number = 0;

  constructor(private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.updateSelectedTotal(); // Tính toán tổng tiền hàng khi khởi tạo
    this.route.queryParams.subscribe((params) => {
      this.totalAmount = +params['totalAmount'] || 0;
    });
  }
  

  updateSelectedTotal() {
    this.cartService.getCartItems().subscribe(cartItems => {
      this.totalSelectedAmount = cartItems
        .filter((item: { selected: boolean }) => item.selected)
        .reduce(
          (total: number, item: { product: { price: number }; quantity: number }) => 
            total + item.product.price * item.quantity, 
          0
        );
      this.totalAmountAfterVoucher = this.totalSelectedAmount - this.voucherValue;
    });
  }
  


  applyVoucher(voucherInput: string | number): void {
    const voucherValue = typeof voucherInput === 'string' ? this.convertToNumber(voucherInput) : voucherInput;
  
    // Kiểm tra voucher hợp lệ và tính toán
    if (voucherValue > 0 && voucherValue <= this.totalAmount) {
      this.voucherValue = voucherValue;
      this.totalAmountAfterVoucher = this.totalAmount - this.voucherValue;
    } else {
      alert('Giá trị voucher không hợp lệ! Vui lòng nhập số tiền nhỏ hơn hoặc bằng tổng tiền hàng.');
      this.voucherValue = 0;
      this.totalAmountAfterVoucher = this.totalAmount;
    }
  }
  


  convertToNumber(value: string): number {
    const converted = parseFloat(value);
    return isNaN(converted) ? 0 : converted;
  }
  
  
  

}
