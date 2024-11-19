export interface Product {
  ID_SanPham: string;
  TenSanPham: string;
  SoLuong: number;
  Dongia: number;
}

export interface Order {
  ID_Donhang: string;
  ID_Khachhang: string;
  Tinhtrang: string;
  SanPham: Product[];
}
