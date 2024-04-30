import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhGiaComponent } from './danh-gia.component';

describe('DanhGiaComponent', () => {
  let component: DanhGiaComponent;
  let fixture: ComponentFixture<DanhGiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DanhGiaComponent]
    });
    fixture = TestBed.createComponent(DanhGiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
