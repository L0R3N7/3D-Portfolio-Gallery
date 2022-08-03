import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cube2Component } from './cube2.component';

describe('Cube2Component', () => {
  let component: Cube2Component;
  let fixture: ComponentFixture<Cube2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cube2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cube2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
