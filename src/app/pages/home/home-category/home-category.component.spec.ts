import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCategoryComponent } from './home-category.component';

describe('HomeCategoryComponent', () => {
  let component: HomeCategoryComponent;
  let fixture: ComponentFixture<HomeCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeCategoryComponent]
    });
    fixture = TestBed.createComponent(HomeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
