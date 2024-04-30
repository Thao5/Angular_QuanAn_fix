import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongTinCaNhanComponent } from './thong-tin-ca-nhan.component';

describe('ThongTinCaNhanComponent', () => {
  let component: ThongTinCaNhanComponent;
  let fixture: ComponentFixture<ThongTinCaNhanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThongTinCaNhanComponent]
    });
    fixture = TestBed.createComponent(ThongTinCaNhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
