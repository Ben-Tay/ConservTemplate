import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ERJobsPage } from './erjobs.page';

describe('ERJobsPage', () => {
  let component: ERJobsPage;
  let fixture: ComponentFixture<ERJobsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ERJobsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ERJobsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
