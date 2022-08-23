import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitCardComponent } from './exhibit-card.component';

describe('ExhibitCardComponent', () => {
  let component: ExhibitCardComponent;
  let fixture: ComponentFixture<ExhibitCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExhibitCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExhibitCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
