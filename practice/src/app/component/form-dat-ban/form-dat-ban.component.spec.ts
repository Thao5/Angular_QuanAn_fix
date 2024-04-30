import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDatBanComponent } from './form-dat-ban.component';

describe('FormDatBanComponent', () => {
  let component: FormDatBanComponent;
  let fixture: ComponentFixture<FormDatBanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormDatBanComponent]
    });
    fixture = TestBed.createComponent(FormDatBanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
