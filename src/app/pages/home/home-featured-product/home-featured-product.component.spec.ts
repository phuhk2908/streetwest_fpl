import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFeaturedProductComponent } from './home-featured-product.component';

describe('HomeFeaturedProductComponent', () => {
  let component: HomeFeaturedProductComponent;
  let fixture: ComponentFixture<HomeFeaturedProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeFeaturedProductComponent]
    });
    fixture = TestBed.createComponent(HomeFeaturedProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
