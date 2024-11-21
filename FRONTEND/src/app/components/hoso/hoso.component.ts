import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-hoso',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hoso.component.html',
  styleUrl: './hoso.component.css',
})
export class HosoComponent {
  activeTab: string = 'profile';
  orderStatus: string = 'ordered';
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

  user: any = {
    name: '',
    email: '',
    fullName: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
    // avatar: '',
    address: [],
    banks: [],
  };
  

  constructor(private http: HttpClient, private authService: AuthService) { }


  ngOnInit() {
    // Lấy thông tin từ AuthService
    this.user.name = this.authService.getUserName();
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      this.user.email = parsedUser.email || '';
    }
    // Tải thêm thông tin từ server nếu cần
    this.loadUserData();
  }
  // ngOnInit() {
  //   this.loadUserData();
  // }

  // Tải dữ liệu người dùng từ server
  // loadUserData() {
  //   const userId = 'current-user-id'; 
  //   this.http.get(`/api/users/${userId}`).subscribe(
  //     (response: any) => {
  //       this.user = response.user;
  //     },
  //     (error) => {
  //       console.error('Lỗi khi tải dữ liệu người dùng:', error);
  //     }
  //   );
  // }

  // loadUserData() {
  //   const userId = 'current-user-id'; // Thay bằng cách lấy userId từ auth
  //   this.http.get(`/api/users/${userId}`).subscribe(
  //     (response: any) => {
  //       if (response && response.user) {
  //         // Gán dữ liệu từ API vào object user
  //         this.user = { 
  //           ...this.user,
  //           name: response.user.name,
  //           email: response.user.email,
  //           fullName: response.user.fullName || '',
  //           phone: response.user.phone || '',
  //           gender: response.user.gender || '',
  //           dateOfBirth: response.user.dateOfBirth || '',
  //           avatar: response.user.avatar || '',
  //           address: response.user.addresses || [],
  //           banks: response.user.banks || []
  //         };
  //       }
  //     },
  //     (error) => {
  //       console.error('Lỗi khi tải dữ liệu người dùng:', error);
  //     }
  //   );
  // }

  loadUserData() {
    const userId = 'current-user-id'; // Thay bằng userId từ auth token hoặc context
    this.http.get(`/api/users/${userId}`).subscribe(
      (response: any) => {
        this.user = { ...this.user, ...response.user }; // Cập nhật lại thông tin
      },
      (error) => {
        console.error('Lỗi khi tải dữ liệu người dùng:', error);
      }
    );
  }
  

  // Chuyển đổi tab
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  // Lưu thông tin hồ sơ
  // saveProfile() {
  //   const updatedUser = {
  //     fullName: this.user.fullName,
  //     phone: this.user.phone,
  //     gender: this.user.gender,
  //     dateOfBirth: this.user.dateOfBirth,
  //     address: this.user.address,
  //     banks: this.user.banks,
  //   };

  //   const userId = 'current-user-id'; 
  //   this.http.put(`/api/users/${userId}/profile`, updatedUser).subscribe(
  //     (response: any) => {
  //       alert('Hồ sơ đã được cập nhật thành công!');
  //       this.user = { ...this.user, ...response.user };
  //     },
  //     (error) => {
  //       console.error('Lỗi khi cập nhật hồ sơ:', error);
  //       alert('Cập nhật hồ sơ thất bại. Vui lòng thử lại!');
  //     }
  //   );
  // }


  saveProfile() {
    const updatedUser = {
      fullName: this.user.fullName,
      phone: this.user.phone,
      gender: this.user.gender,
      dateOfBirth: this.user.dateOfBirth,
      address: this.user.address,
      banks: this.user.banks,
    };
  
    console.log('Dữ liệu gửi lên API:', updatedUser);
  
    const userId = 'current-user-id';
    this.http.put(`/api/users/${userId}/profile`, updatedUser).subscribe(
      (response: any) => {
        alert('Hồ sơ đã được cập nhật thành công!');
        this.user = { ...this.user, ...response.user }; // Cập nhật lại user
      },
      (error) => {
        console.error('Lỗi khi cập nhật hồ sơ:', error);
        alert('Cập nhật hồ sơ thất bại. Vui lòng thử lại!');
      }
    );
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
