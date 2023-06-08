import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminorderComponent } from './adminorder.component';

describe('AdminorderComponent', () => {
  let component: AdminorderComponent;
  let fixture: ComponentFixture<AdminorderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminorderComponent]
    });
    fixture = TestBed.createComponent(AdminorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
