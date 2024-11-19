import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThucdonFormComponent } from './thucdon-form.component';

describe('ThucdonFormComponent', () => {
  let component: ThucdonFormComponent;
  let fixture: ComponentFixture<ThucdonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThucdonFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThucdonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
