import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivepaymentPage } from './receivepayment.page';

describe('ReceivepaymentPage', () => {
  let component: ReceivepaymentPage;
  let fixture: ComponentFixture<ReceivepaymentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivepaymentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivepaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
