import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaynowPage } from './paynow.page';

describe('PaynowPage', () => {
  let component: PaynowPage;
  let fixture: ComponentFixture<PaynowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaynowPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaynowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
