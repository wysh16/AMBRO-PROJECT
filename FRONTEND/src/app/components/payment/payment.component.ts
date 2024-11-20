import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
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
  isCodeVerification: boolean = false; // Trạng thái để theo dõi giao diện
  codeInput: string[] = ['', '', '', ''];
  

  constructor(private cartService: CartService,
    private route: ActivatedRoute, private router: Router
  ) {}

  ngOnInit(): void {
    this.updateSelectedTotal(); // Tính toán tổng tiền hàng khi khởi tạo
    this.route.queryParams.subscribe((params) => {
      this.totalAmount = +params['totalAmount'] || 0;
    });
  }
  

  goToCodeVerification() {
    this.isCodeVerification = true;
  }

  verifyCode() {
    const code = this.codeInput.join(''); // Ghép các ký tự lại thành mã code
    if (code.length === 4) {
      // Thực hiện logic xác minh mã code
      alert('Xác nhận thanh toán thành công!');
      // Điều hướng hoặc thực hiện hành động tiếp theo
    } else {
      alert('Vui lòng nhập đủ 4 ký tự!');
    }
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
