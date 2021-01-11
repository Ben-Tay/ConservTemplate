import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientjobsnotificationPage } from './clientjobsnotification.page';

describe('ClientjobsnotificationPage', () => {
  let component: ClientjobsnotificationPage;
  let fixture: ComponentFixture<ClientjobsnotificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientjobsnotificationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientjobsnotificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
