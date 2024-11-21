import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit{
  teamMembers = [
    {
      name: 'Nguyễn Đặng Phương Nhi',
      role: 'CTO của Ambro',
      description: 'Kiến trúc sư công nghệ, dẫn đầu các sáng tạo kỹ thuật và định hình tương lai kỹ thuật số của công ty.',
      photo: 'assets/about/nhi.jpg'
    },
    {
      name: 'Nguyễn Thị Thu Hương',
      role: 'CMO của Ambro',
      description: 'Chuyên gia sáng tạo và truyền cảm hứng, đảm bảo thương hiệu luôn được yêu thích và gắn kết với khách hàng.',
      photo: 'assets/about/huong.jpg'
    },
    {
      name: 'Trịnh Trần Phương Linh',
      role: 'CEO của Ambro',
      description: 'Người lãnh đạo, định hướng chiến lược và đảm bảo sự thành công lâu dài của tổ chức.',
      photo: 'assets/about/lin.jpg'
    },
    {
      name: 'Triệu Thị Hà',
      role: 'CFO của Ambro',
      description: 'Người bảo vệ tài chính, đảm bảo ngân sách được sử dụng hiệu quả và định hướng tăng trưởng kinh tế.',
      photo: 'assets/about/ha.jpg'
    },
    {
      name: 'Trần Thị Anh Đào',
      role: 'CCO của Ambro',
      description: 'Người lắng nghe và đáp ứng khách hàng, mang lại trải nghiệm tuyệt vời và sự hài lòng cao nhất.',
      photo: 'assets/about/dao.jpg'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
