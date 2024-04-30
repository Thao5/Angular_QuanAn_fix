import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatbanComponent } from './datban.component';

describe('DatbanComponent', () => {
  let component: DatbanComponent;
  let fixture: ComponentFixture<DatbanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatbanComponent]
    });
    fixture = TestBed.createComponent(DatbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
