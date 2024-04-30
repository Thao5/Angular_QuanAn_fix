import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChonBanComponent } from './chon-ban.component';

describe('ChonBanComponent', () => {
  let component: ChonBanComponent;
  let fixture: ComponentFixture<ChonBanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChonBanComponent]
    });
    fixture = TestBed.createComponent(ChonBanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
