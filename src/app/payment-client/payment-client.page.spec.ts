import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentClientPage } from './payment-client.page';

describe('PaymentClientPage', () => {
  let component: PaymentClientPage;
  let fixture: ComponentFixture<PaymentClientPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentClientPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentClientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
