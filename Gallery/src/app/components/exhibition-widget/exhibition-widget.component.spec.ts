import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitionWidgetComponent } from './exhibition-widget.component';

describe('ExhibitionWidgetComponent', () => {
  let component: ExhibitionWidgetComponent;
  let fixture: ComponentFixture<ExhibitionWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExhibitionWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExhibitionWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
