import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ERoverduePage } from './eroverdue.page';

describe('ERoverduePage', () => {
  let component: ERoverduePage;
  let fixture: ComponentFixture<ERoverduePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ERoverduePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ERoverduePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
