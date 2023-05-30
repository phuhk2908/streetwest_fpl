import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNewArrivalsComponent } from './home-new-arrivals.component';

describe('HomeNewArrivalsComponent', () => {
  let component: HomeNewArrivalsComponent;
  let fixture: ComponentFixture<HomeNewArrivalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeNewArrivalsComponent]
    });
    fixture = TestBed.createComponent(HomeNewArrivalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
