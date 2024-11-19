import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
//   cartItems: {
//     isSelected: unknown; product: any; quantity: number; selected: boolean 
// }[] = [];
cartItems: any[] = []; // Danh sách sản phẩm trong giỏ hàng

  selectedItems: any[] = [];

  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
  }


  getSelectedItems() {
    this.selectedItems = this.cartItems.filter(item => item.isSelected);
  }

  // loadCartItems() {
  //   this.cartService.getCartItems().subscribe(
  //     (data) => {
  //       if (data && data.items) {
  //         this.cartItems = data.items.map((item: any) => {
  //           return {
  //             product: item.productId,
  //             quantity: item.quantity,
  //             selected: false,
  //           };
  //         });
  //       } else {
  //         console.error('Dữ liệu giỏ hàng không hợp lệ');
  //       }
  //     },
  //     (error) => {
  //       console.error('Lỗi khi lấy giỏ hàng:', error);
  //     }
  //   );
  // }

  loadCartItems(): void {
    this.cartService.getCartItems().subscribe({
      next: (data) => {
        this.cartItems = data.items.map((item: any) => ({
          ...item,
          selected: false, // Mặc định chưa được chọn
        }));
      },
      error: (err) => console.error(err),
    });
  }

  // toggleSelectAll(event: any) {
  //   const isChecked = event.target.checked;
  //   this.cartItems.forEach((item) => (item.selected = isChecked));
  // }


  // Hàm toggle chọn tất cả checkbox
  toggleSelectAll(event: any): void {
    this.isAllSelected = event.target.checked; // Lấy trạng thái checkbox "Chọn tất cả"
    this.cartItems.forEach((item) => {
      item.selected = this.isAllSelected;
      this.cartService.updateSelectedStatus(item.productId, item.selected).subscribe({
        next: () => console.log('Trạng thái selected cập nhật cho sản phẩm:', item.productId),
        error: (err) => console.error('Lỗi khi cập nhật trạng thái:', err),
      });
    });
  }

  toggleSelected(item: any): void {
    item.selected = !item.selected; // Thay đổi trạng thái
    this.cartService.updateSelectedStatus(item.productId, item.selected).subscribe({
      next: () => console.log('Cập nhật trạng thái selected thành công'),
      error: (err) => console.error('Lỗi khi cập nhật trạng thái:', err),
    });
  }
  

  isAllSelected(): boolean {
    return (
      this.cartItems.length > 0 && this.cartItems.every((item) => item.selected)
    );
  }

  updateCartItem(item: any, index: number) {
    this.cartService
      .updateCartItem(item.product._id, item.quantity)
      .subscribe(() => {
        this.loadCartItems();
      });
  }

  // Xóa một sản phẩm khỏi giỏ hàng
  removeItem(productId: string) {
    this.cartService.removeFromCart(productId).subscribe(
      () => {
        this.loadCartItems(); // Tải lại giỏ hàng
      },
      (error) => {
        console.error('Lỗi khi xóa sản phẩm:', error);
      }
    );
  }

  confirmRemove(productId: string) {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
      this.removeItem(productId);
    }
  }

  removeSelected() {
    const selectedProductIds = this.cartItems
      .filter((item) => item.selected)
      .map((item) => item.product._id);

    if (selectedProductIds.length > 0) {
      this.cartService.removeSelectedItems(selectedProductIds).subscribe(() => {
        this.loadCartItems(); // Tải lại giỏ hàng sau khi xóa
      });
    }
  }

  confirmRemoveSelected() {
    const selectedItems = this.cartItems.filter((item) => item.selected);
    if (selectedItems.length === 0) {
      alert('Chưa chọn sản phẩm nào để xóa');
      return;
    }

    if (confirm('Bạn có chắc chắn muốn xóa các sản phẩm đã chọn không?')) {
      this.removeSelected();
    }
  }

  getTotalItems() {
    return this.cartItems.length;
  }

  getTotalAmount() {
    return this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  getTotalSelectedAmount(): number {
    return this.cartItems
      .filter((item) => item.selected) 
      .reduce((total, item) => total + item.product.price * item.quantity, 0); 
  }

  continueShopping() {
    // Logic để tiếp tục mua hàng, ví dụ:
    this.router.navigate(['/products']); // Điều hướng đến trang sản phẩm
  }


  proceedToPayment(): void {
    this.cartService.getSelectedItems().subscribe((data: any) => {
      if (data.items.length > 0) {
        this.router.navigate(['/thanhtoan'], { state: { selectedItems: data.items } });
      } else {
        alert('Bạn chưa chọn sản phẩm nào để thanh toán.');
      }
    });
  }
  

  // proceedToPayment(): void {
  //   const selectedItems = this.cartItems.filter(item => item.selected);
  //   if (selectedItems.length > 0) {
  //     this.router.navigate(['/thanhtoan'], { state: { selectedItems } });
  //   } else {
  //     alert('Vui lòng chọn ít nhất một sản phẩm để thanh toán!');
  //   }
  // }


  // proceedToPayment() {
  //   this.getSelectedItems();

  //   if (this.selectedItems.length === 0) {
  //     alert('Bạn chưa chọn sản phẩm nào để thanh toán.');
  //     return;
  //   }

  //   this.router.navigate(['/thanhtoan'], {
  //     state: { selectedItems: this.selectedItems },
  //   });
  // }


  // proceedToPayment(): void {
  //   const selectedItems = this.cartItems.filter(item => item.selected); // Lọc sản phẩm được chọn
  
  //   if (selectedItems.length === 0) {
  //     alert('Bạn chưa chọn sản phẩm nào để thanh toán.');
  //     return;
  //   }
  
  //   this.router.navigate(['/thanhtoan'], { state: { selectedItems } }); 
  // }

  // proceedToPayment(): void {
  //   this.router.navigate(['/thanhtoan'], { state: { selectedItems: this.cartItems } });
  // }

    // Lưu sản phẩm đã chọn vào `state` khi điều hướng
    // this.router.navigate(['/thanhtoan'], {
    //   state: { selectedItems: selectedItems },
    // });

  //   sessionStorage.setItem('selectedItems', JSON.stringify(selectedItems));

  //   this.router.navigate(['/thanhtoan']);
  // }


  onItemSelectionChange(): void {
    // Cập nhật danh sách sản phẩm được chọn khi checkbox thay đổi
    this.selectedItems = this.cartItems.filter(item => item.isSelected);
  }
  
}
