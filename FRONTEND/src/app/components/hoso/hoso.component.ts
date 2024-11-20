import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hoso',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hoso.component.html',
  styleUrl: './hoso.component.css',
})
export class HosoComponent {
  // Tab đang được chọn
  activeTab: string = 'profile';

  // Trạng thái đơn hàng
  orderStatus: string = 'ordered';

  // Dữ liệu đơn hàng (mock)
  orders = {
    ordered: [
      {
        id: 'DH001',
        productName: 'Sản phẩm A',
        price: 500000,
        date: '2024-11-10',
      },
      {
        id: 'DH002',
        productName: 'Sản phẩm B',
        price: 300000,
        date: '2024-11-12',
      },
    ],
    shipping: [
      {
        id: 'DH003',
        productName: 'Sản phẩm C',
        price: 450000,
        estimatedDelivery: '2024-11-25',
      },
    ],
    delivered: [
      {
        id: 'DH004',
        productName: 'Sản phẩm D',
        price: 350000,
        deliveryDate: '2024-11-15',
      },
      {
        id: 'DH005',
        productName: 'Sản phẩm E',
        price: 400000,
        deliveryDate: '2024-11-18',
      },
    ],
  };

  // Dữ liệu người dùng (mock dữ liệu để trình bày)
  user = {
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    addresses: [
      '123 Đường ABC, Phường 1, Quận 1',
      '456 Đường XYZ, Phường 2, Quận 3',
    ],
    banks: ['Ngân hàng ACB - 123456789', 'Ngân hàng Vietcombank - 987654321'],
  };

  // Chuyển đổi tab
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  // Lưu hồ sơ
  saveProfile() {
    console.log('Hồ sơ đã được lưu:', this.user);
    alert('Hồ sơ của bạn đã được lưu thành công!');
  }

  // Thêm địa chỉ mới
  addAddress() {
    const newAddress = prompt('Nhập địa chỉ mới:');
    if (newAddress) {
      this.user.addresses.push(newAddress);
      console.log('Địa chỉ mới đã được thêm:', newAddress);
    }
  }

  // Thêm tài khoản ngân hàng mới
  addBank() {
    const newBank = prompt('Nhập thông tin ngân hàng mới:');
    if (newBank) {
      this.user.banks.push(newBank);
      console.log('Tài khoản ngân hàng mới đã được thêm:', newBank);
    }
  }

  // Đổi mật khẩu
  changePassword() {
    const oldPassword = prompt('Nhập mật khẩu cũ:');
    const newPassword = prompt('Nhập mật khẩu mới:');
    if (oldPassword && newPassword) {
      console.log('Mật khẩu đã được thay đổi.');
      alert('Mật khẩu của bạn đã được đổi thành công!');
    } else {
      alert('Vui lòng nhập đầy đủ thông tin để đổi mật khẩu!');
    }
  }

  // Hàm chuyển đổi trạng thái đơn hàng
  setOrderStatus(status: string) {
    this.orderStatus = status;
  }
}
