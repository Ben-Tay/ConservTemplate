import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsAcceptedPage } from './jobs-accepted.page';

describe('JobsAcceptedPage', () => {
  let component: JobsAcceptedPage;
  let fixture: ComponentFixture<JobsAcceptedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsAcceptedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsAcceptedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
