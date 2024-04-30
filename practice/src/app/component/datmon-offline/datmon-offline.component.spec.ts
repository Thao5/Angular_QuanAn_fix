import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatmonOfflineComponent } from './datmon-offline.component';

describe('DatmonOfflineComponent', () => {
  let component: DatmonOfflineComponent;
  let fixture: ComponentFixture<DatmonOfflineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatmonOfflineComponent]
    });
    fixture = TestBed.createComponent(DatmonOfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
