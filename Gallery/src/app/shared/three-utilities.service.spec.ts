import { TestBed } from '@angular/core/testing';

import { ThreeUtilitiesService } from './three-utilities.service';

describe('ThreeUtilitiesService', () => {
  let service: ThreeUtilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThreeUtilitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
