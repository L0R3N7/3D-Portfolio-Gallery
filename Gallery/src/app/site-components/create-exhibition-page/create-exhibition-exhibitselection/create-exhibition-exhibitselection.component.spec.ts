import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExhibitionExhibitselectionComponent } from './create-exhibition-exhibitselection.component';

describe('CreateExhibitionExhibitselectionComponent', () => {
  let component: CreateExhibitionExhibitselectionComponent;
  let fixture: ComponentFixture<CreateExhibitionExhibitselectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateExhibitionExhibitselectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateExhibitionExhibitselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
