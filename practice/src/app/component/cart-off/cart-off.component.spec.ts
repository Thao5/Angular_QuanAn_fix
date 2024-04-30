import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartOffComponent } from './cart-off.component';

describe('CartOffComponent', () => {
  let component: CartOffComponent;
  let fixture: ComponentFixture<CartOffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartOffComponent]
    });
    fixture = TestBed.createComponent(CartOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
