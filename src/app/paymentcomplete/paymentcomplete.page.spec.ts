import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentcompletePage } from './paymentcomplete.page';

describe('PaymentcompletePage', () => {
  let component: PaymentcompletePage;
  let fixture: ComponentFixture<PaymentcompletePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentcompletePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentcompletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
