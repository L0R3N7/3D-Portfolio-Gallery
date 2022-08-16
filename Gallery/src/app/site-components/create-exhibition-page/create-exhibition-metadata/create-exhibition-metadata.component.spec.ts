import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExhibitionMetadataComponent } from './create-exhibition-metadata.component';

describe('CreateExhibitionMetadataComponent', () => {
  let component: CreateExhibitionMetadataComponent;
  let fixture: ComponentFixture<CreateExhibitionMetadataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateExhibitionMetadataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateExhibitionMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
