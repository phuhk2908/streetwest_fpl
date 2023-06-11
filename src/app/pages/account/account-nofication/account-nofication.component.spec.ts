import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountNoficationComponent } from './account-nofication.component';

describe('AccountNoficationComponent', () => {
  let component: AccountNoficationComponent;
  let fixture: ComponentFixture<AccountNoficationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountNoficationComponent]
    });
    fixture = TestBed.createComponent(AccountNoficationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
