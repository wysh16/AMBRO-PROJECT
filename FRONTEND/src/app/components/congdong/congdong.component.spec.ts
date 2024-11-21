import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongdongComponent } from './congdong.component';

describe('CongdongComponent', () => {
  let component: CongdongComponent;
  let fixture: ComponentFixture<CongdongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CongdongComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CongdongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
