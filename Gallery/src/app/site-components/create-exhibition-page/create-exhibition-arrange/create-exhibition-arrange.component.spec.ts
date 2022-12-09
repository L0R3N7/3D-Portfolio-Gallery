import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExhibitionArrangeComponent } from './create-exhibition-arrange.component';

describe('CreateExhibitionArrangeComponent', () => {
  let component: CreateExhibitionArrangeComponent;
  let fixture: ComponentFixture<CreateExhibitionArrangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateExhibitionArrangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateExhibitionArrangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
