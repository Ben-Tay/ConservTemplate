import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangedatePage } from './changedate.page';

describe('ChangedatePage', () => {
  let component: ChangedatePage;
  let fixture: ComponentFixture<ChangedatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangedatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangedatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
