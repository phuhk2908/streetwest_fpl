import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOrderComponent } from './account-order.component';

describe('AccountOrderComponent', () => {
  let component: AccountOrderComponent;
  let fixture: ComponentFixture<AccountOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountOrderComponent]
    });
    fixture = TestBed.createComponent(AccountOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
