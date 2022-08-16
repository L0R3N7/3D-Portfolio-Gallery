import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExhibitionRoomselectionComponent } from './create-exhibition-roomselection.component';

describe('CreateExhibitionRoomselectionComponent', () => {
  let component: CreateExhibitionRoomselectionComponent;
  let fixture: ComponentFixture<CreateExhibitionRoomselectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateExhibitionRoomselectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateExhibitionRoomselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
