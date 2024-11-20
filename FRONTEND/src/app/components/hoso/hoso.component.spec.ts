import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HosoComponent } from './hoso.component';

describe('HosoComponent', () => {
  let component: HosoComponent;
  let fixture: ComponentFixture<HosoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HosoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HosoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
