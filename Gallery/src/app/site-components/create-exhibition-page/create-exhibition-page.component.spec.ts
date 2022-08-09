import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExhibitionPageComponent } from './create-exhibition-page.component';

describe('CreateExhibitionPageComponent', () => {
  let component: CreateExhibitionPageComponent;
  let fixture: ComponentFixture<CreateExhibitionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateExhibitionPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateExhibitionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
