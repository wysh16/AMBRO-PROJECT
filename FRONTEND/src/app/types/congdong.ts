export interface HoatDong {
  ID: number;
  Tacgia: string;
  Hoatdong: {
    tieude: string;
    date: string;
    time: string;
  };
  Noidung: string;
  Hinhanh: string;
  trangThai: string;
}

export interface User {
  id: string;
  ten: string;
  soBaiViet: number;
  soLanBinhLuan: number;
  soLanThich: number;
  trangThai: string;
}
