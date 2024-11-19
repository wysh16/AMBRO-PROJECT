import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonhangsComponent } from './donhangs.component';

describe('DonhangsComponent', () => {
  let component: DonhangsComponent;
  let fixture: ComponentFixture<DonhangsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonhangsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonhangsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
