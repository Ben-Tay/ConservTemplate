import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientoverduePage } from './clientoverdue.page';

describe('ClientoverduePage', () => {
  let component: ClientoverduePage;
  let fixture: ComponentFixture<ClientoverduePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientoverduePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientoverduePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
