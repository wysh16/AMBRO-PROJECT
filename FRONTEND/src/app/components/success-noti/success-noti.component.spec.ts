import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessNotiComponent } from './success-noti.component';

describe('SuccessNotiComponent', () => {
  let component: SuccessNotiComponent;
  let fixture: ComponentFixture<SuccessNotiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessNotiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessNotiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
