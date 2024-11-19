import { TestBed } from '@angular/core/testing';

import { CongdongService } from './congdong.service';

describe('CongdongService', () => {
  let service: CongdongService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CongdongService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
