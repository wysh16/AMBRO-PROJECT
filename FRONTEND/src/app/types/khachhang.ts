export interface KhachHang {
  _id?: string; // Optional ID field
  fullName: string;
  phone: string;
  email: string;
  address: string;
  bankAccount: {
    accountNumber: string;
    bankName: string;
  };
  status: string;
}
