import { TestBed } from '@angular/core/testing';

import { CreateExhibitionPageService } from './create-exhibition-page.service';

describe('CreateExhibitionPageService', () => {
  let service: CreateExhibitionPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateExhibitionPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
