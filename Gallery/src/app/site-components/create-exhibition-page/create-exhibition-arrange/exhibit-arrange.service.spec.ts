import { TestBed } from '@angular/core/testing';

import { ExhibitArrangeService } from './exhibit-arrange.service';

describe('ExhibitArrangeService', () => {
  let service: ExhibitArrangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExhibitArrangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
