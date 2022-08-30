import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeDObjectLoaderComponent } from './three-d-object-loader.component';

describe('ThreeDObjectLoaderComponent', () => {
  let component: ThreeDObjectLoaderComponent;
  let fixture: ComponentFixture<ThreeDObjectLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreeDObjectLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreeDObjectLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
