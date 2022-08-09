import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTagComponent } from './info-tag.component';

describe('InfoTagComponent', () => {
  let component: InfoTagComponent;
  let fixture: ComponentFixture<InfoTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoTagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
