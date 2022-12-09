import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeRoomSelectionComponent } from './three-room-selection.component';

describe('ThreeRoomSelectionComponent', () => {
  let component: ThreeRoomSelectionComponent;
  let fixture: ComponentFixture<ThreeRoomSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreeRoomSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreeRoomSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
