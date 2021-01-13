import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientjobsPage } from './clientjobs.page';

describe('ClientjobsPage', () => {
  let component: ClientjobsPage;
  let fixture: ComponentFixture<ClientjobsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientjobsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientjobsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
