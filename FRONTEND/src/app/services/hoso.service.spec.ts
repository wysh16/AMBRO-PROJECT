import { TestBed } from '@angular/core/testing';

import { HosoService } from './hoso.service';

describe('HosoService', () => {
  let service: HosoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HosoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
