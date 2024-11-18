import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdeeResultComponent } from './tdee-result.component';

describe('TdeeResultComponent', () => {
  let component: TdeeResultComponent;
  let fixture: ComponentFixture<TdeeResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TdeeResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TdeeResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
